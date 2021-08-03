var User = require('../models/user');
var https = require('https');
// var countryList = require('country-list');
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
 
  
  Profile: function(req,res) {

    var gravatar = require('gravatar');
    
    User.findOne({active: true}, function(err, user) { 
      if(err) { throw err }

      var email = user.email;

      var url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);

      res.render('home/profile', {username: user.username, vaccination_status: user.vaccination_status, url: url})
    })
  },

  EditPage: function(req, res) {
    var gravatar = require('gravatar');
    
    User.findOne({active: true}, function(err, user) { 
      if(err) { throw err }

      var email = user.email;
      var url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);

      res.render('home/edit', {username: user.username, vaccination_status: user.vaccination_status, url: url})
    })
  },

  EditUsername: function(req, res){
    var username = req.body.username
  

    User.updateOne({active: true}, {"username": username}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/edit')
    })
  },

  EditVaccine: function(req, res){
    var vaccination_status = req.body.vaccination_status
    console.log(req.body)
  
    User.updateOne({active: true}, {"vaccination_status": vaccination_status}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/profile')
    })
  }
};

module.exports = HomeController;