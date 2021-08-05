var User = require('../models/user');
var https = require('https');
var countryList = require('country-list');
var jsdom = require("jsdom");


var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Travel Bug' });
  },

  SignupPage: function(req, res) {
    res.render('home/signup');
  },

  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/sessions');
    });
  },

  SigninPage: function(req, res) {
    res.render('home/signin');
  },

  Signin: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function(err, user) {
      if(!user){
        res.status(201).redirect('/sessions');
      }
      else if(user.password === password) {
        req.session.user_sid = user._id;
        res.status(201).redirect('/profile');
      }
    });
  },

  Signout: function(req, res) {
    if (req.session.user_sid) {
      res.clearCookie('user_sid');
      res.status(201).redirect('/');
    }
  },

  List: function(req, res) {

    var url = 'https://www.gov.uk/api/content/guidance/red-amber-and-green-list-rules-for-entering-england';


    https.get(url, function(response){
      var result = '';

      response.on('data', function(data){
        result += data;
      })

      response.on('end', function(){
        var resultJSON = JSON.parse(result);
        var pageData = resultJSON.details.body;

        var dom = new jsdom.JSDOM(pageData);
        var doc = dom.window.document;

        function getCountries(content, tableNumber){
          var countries = [];
          var table = content.getElementsByTagName("table")[tableNumber];
          var tableRows = table.getElementsByTagName("tbody")[0].children;

          for(var i=0; i<tableRows.length; i++){
            countries.push(tableRows[i].firstElementChild.textContent);
          }

          return countries;
        }

        var redList = getCountries(doc, 0);
        var amberList = getCountries(doc, 1);
        var greenList = getCountries(doc, 2);

        res.render('explore/index', { redList: redList, amberList: amberList, greenList: greenList })
      })
    })

  },
 
  Profile: function(req, res) {
    var url = 'https://www.gov.uk/api/content/guidance/red-amber-and-green-list-rules-for-entering-england';
    var gravatar = require('gravatar');
    var userID = req.session.user_sid;

    https.get(url, function(response){
      var result = '';
      
      response.on('data', function(data){
        result += data;
      })

      response.on('end', function(){
        var resultJSON = JSON.parse(result);
        var pageData = resultJSON.details.body;

        var dom = new jsdom.JSDOM(pageData);
        var doc = dom.window.document;

        function getCountries(content, tableNumber){
          var countries = [];
          var table = content.getElementsByTagName("table")[tableNumber];
          var tableRows = table.getElementsByTagName("tbody")[0].children;

          for(var i=0; i<tableRows.length; i++){
            var countryName = tableRows[i].firstElementChild.textContent;
            var countryId = countryName.replace(/[^A-Z0-9]/ig, "");
            var colour = "";
            if(tableNumber === 2) {
              colour = "green";
            } else if (tableNumber === 1){
              colour = "amber";
            } else {
              colour = "red";
            }
            
            var countryObj = { id: countryId, name: countryName, colour: colour};
            countries.push(countryObj);
          }

          return countries;
        }

        function getRules(content){

          var rules = [];
          
          var allElements = content.querySelectorAll("*");
          var splitElements = allElements[0].innerHTML.replace(/>/g,'>\x1d').split(/(?=<)|\x1d/);
          
          var amberStartInd = splitElements.indexOf('<h3 id="amber-list-rules-if-fully-vaccinated-in-europe-or-the-usa">');
          var amberEndInd = splitElements.indexOf('Find out more about the ') + 7;
          var amberSlice = splitElements.slice(amberStartInd, amberEndInd);
          amberSlice = amberSlice.join("").replace(/(<([^>]+)>)/gi, " ");
          
          var greenStartInd = splitElements.indexOf('<h2 id="green-list-rules">');
          var greenEndInd = splitElements.indexOf('You do not need to quarantine unless the test result is positive.') + 2;
          var greenSlice = splitElements.slice(greenStartInd, greenEndInd);
          greenSlice = greenSlice.join("\n").replace(/(<([^>]+)>)/gi, " ");

          var vaxRules = { green: greenSlice, amber: amberSlice };
          var unVaxRules = { green: greenSlice };
          
          rules.push(vaxRules);
          rules.push(unVaxRules);

          return rules;

        }

        var greenList = getCountries(doc, 2);
        var amberList = getCountries(doc, 1);
        var noFlyList = ["Afghanistan", "Burkina Faso", "Central African Republic", "Haiti", "Iran", "Iraq", "Libya", "Mali",
        "North Korea", "Mali", "Somalia", "South Sudan", "Syria", "Venezuela", "Yemen", "El Salvador", "Chad", "Honduras", 
        "Nicaragua", "Congo", "Congo (Democratic Republic)", "The Occupied Palestinian Territories", "Sudan", "Niger", 
        "Mozambique", "Ethiopia", "Eritrea", "Cameroon", "Pakistan", "Myanmar", "Ukraine", "Belarus", "Colombia", "Eswatini", 
        "Liberia", "Jordan", "Antarctica/British Antarctic Territory"]

        function getTopSix(countries){
          var randArr = [];
          var topSix = [];

          while(randArr.length < 6){
            var rand =  Math.floor(Math.random() * countries.length);
            if(!randArr.includes(rand)) {
              if(!noFlyList.includes(countries[rand].name)){
                randArr.push(rand);
                topSix.push(countries[rand]);
              }
            }
          }
          
          return topSix;
        }

        User.findOne({_id: userID}, function(err, user) { 
          if(err) { throw err }
          var isVaxed = false;
          var username = user.username;
          var email = user.email;
          var vaccination_status = user.vaccination_status;
          var url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
          var countryListNames = countryList.getNames();
          var fc = user.fav_countries;

          if(vaccination_status === "Vaccinated") {
            isVaxed = true;
          } else {
            isVaxed = false;
          }


          var vaxList = getTopSix(greenList.concat(amberList));
          var unvaxList = getTopSix(greenList);


          var allRules = getRules(doc);

        
          res.render('home/profile', { username: username, vaccination_status: vaccination_status, vaxList: vaxList, unvaxList: unvaxList, 
            isVaxed: isVaxed, url: url, country_list: countryListNames, fav_countries: fc, allRules: allRules});

        });
      })
    })
},

  UpdateProfileFaveCountry: function(req, res){
    var countrySelected = req.body.country
    var userID = req.session.user_sid
    console.log(countrySelected);
    console.log(userID);


    User.findOne({_id: userID}, function(err, user) {
      if(err) { throw err}
      if(!user.fav_countries.includes(countrySelected)){
        user.fav_countries.push(countrySelected);
        user.save();
      }
      res.status(201).redirect('/profile');
    })
  },

  EditPage: function(req, res) {
    var gravatar = require('gravatar');

    var userID = req.session.user_sid

    User.findOne({_id: userID}, function(err, user) {
      if(err) { throw err }

      var email = user.email;
      var url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);

      res.render('home/edit', {username: user.username, vaccination_status: user.vaccination_status, url: url})
    })
  },

  EditUsername: function(req, res){
    var username = req.body.username

    var userID = req.session.user_sid
    User.updateOne({_id: userID}, {"username": username}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/profile/edit')
    })
  },
  EditVaccine: function(req, res){
    var vaccination_status = req.body.vaccination_status
    console.log(req.body)

    var userID = req.session.user_sid
    User.updateOne({_id: userID}, {"vaccination_status": vaccination_status}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/profile')
    })
  }
}



module.exports = HomeController;
