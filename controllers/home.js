var User = require('../models/user');
// var https = require('https');
// var countryList = require('country-list');


var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Travel Bug' });
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
            return res.status(201).redirect('/');
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

  // List: function(req, res) {

  //   var url = "https://www.gov.uk/api/content/guidance/red-amber-and-green-list-rules-for-entering-england";
    

    // https.get(url, function(response){
    //   var result = "";
      
    //   response.on("data", function(data){
    //     result += data;
    //   })

    //   response.on("end", function(){
    //     var resultJSON = JSON.parse(result);
    //     var pageData = resultJSON.details.body;

    //     pageData = pageData.replace(/(<([^>]+)>)/gi, "");

    //     var countriesRef = countryList.getNames();

    //     var redList = pageData.slice(830, 3260);
    //     var filteredRedList = [];

    //     for(var i=0; i<countriesRef.length; i++) {
    //       var redCountry = redList.search(countriesRef[i]);
    //       if(redCountry > -1) {
    //         filteredRedList.push(countriesRef[i]);
    //       }
    //     }
        
    //     filteredRedList = filteredRedList.sort();
        
    //     res.render('explore/index', { redListData: filteredRedList })
    //   })
    // })
    
  // },

  Logo: function(req, res) {
    res.render('home/logo');
  }
};

module.exports = HomeController;