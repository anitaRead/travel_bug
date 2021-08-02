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
            return res.status(201).redirect('/signup');
          }
        }
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

  Profile: function(req, res){
    var countryListNames = countryList.getNames();
    // User.findOne({active: true}, function(err, user) {
    //   if(err) { throw err}
    //   user.fav_countries;
    // })
    res.render('home/profile', {country_list: countryListNames})
  },

  UpdateProfileFaveCountry: function(req, res){
    var country = req.body.country
    console.log(req.body.country);
    // var id = req.params.id;
    // User.find(function(err, users) {
    User.findOne({active: true}, function(err, user) {
      if(err) { throw err}
      user.fav_countries.push(country);
      user.save();
  })
  res.status(201).redirect('/profile')
}

}

module.exports = HomeController;
