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
    User.find(function(err, users) {
      if (err) { throw err; }
      for(var i=0; i<users.length; i++) {
        if(users[i].username === username) {
          if(users[i].password === password) {
            users[i].active = true;
            users[i].save();
            return res.status(201).redirect('/profile');
          }
        }
        users[i].active = false;
        users[i].save();
      }
      res.status(201).redirect('/sessions');
    });
  },

  Signout: function(req, res) {
    User.find(function(err, users) {
      if(err) { throw err }
      for(var i=0; i<users.length; i++) {
        if(users[i].active === true) {
            users[i].active = false;
            users[i].save();
            return res.status(201).redirect('/');
        }
      }
      res.redirect('/');
    });
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

        var greenList = getCountries(doc, 2);
        var amberList = getCountries(doc, 1);
        var noFlyList = ["Afghanistan", "Burkina Faso", "Central African Republic", "Haiti", "Iran", "Iraq", "Libya", "Mali",
        "North Korea", "Mali", "Somalia", "South Sudan", "Syria", "Venezuela", "Yemen", "El Salvador", "Chad", "Honduras", 
        "Nicaragua", "Congo", "Congo (Democratic Republic)", "The Occupied Palestinian Territories", "Sudan", "Sudan", "Niger", 
        "Mozambique", "Ethiopia", "Eritrea", "Cameroon", "Pakistan", "Myanmar", "Ukraine", "Belarus", "Colombia", "Eswatini", 
        "Liberia", "Jordan"]

        function getTopSix(countries){
          var randArr = [];
          var topSix = [];

          while(randArr.length < 6){
            var rand =  Math.floor(Math.random() * countries.length);
            if(!randArr.includes(rand)) {
              if(!noFlyList.includes(countries[rand])){
                randArr.push(rand);
                topSix.push(countries[rand]);
              }
            }
          }
          
          return topSix;
        }

        User.findOne({active: true}, function(err, user) { 
          if(err) { throw err }
          var isVaxed = false;
          var username = user.username;
          var email = user.email;
          var vaccination_status = user.vaccination_status;
          var url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
          var countryListNames = countryList.getNames();
          var fc = user.fav_countries;

          if(user.vaccination_status === "vaccinated") {
            isVaxed = true;
          } else {
            isVaxed = false;
          }

          var vaxList = getTopSix(greenList.concat(amberList));
          var unvaxList = getTopSix(greenList);
        
        
          res.render('home/profile', { username: username, vaccination_status: vaccination_status, vaxList: vaxList, unvaxList: unvaxList, isVaxed: isVaxed, url: url, country_list: countryListNames, fav_countries: fc});

        });
      })
    })
},

  UpdateProfileFaveCountry: function(req, res){
    var countrySelected = req.body.country
    User.findOne({active: true}, function(err, user) {
      if(err) { throw err}
      if(!user.fav_countries.includes(countrySelected)){
        user.fav_countries.push(countrySelected);
        user.save();
      }
      res.status(201).redirect('/profile');
    })
},

}

module.exports = HomeController;
