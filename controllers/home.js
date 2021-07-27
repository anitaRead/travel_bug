var https = require("https");

var HomeController = {
    Index: function(req, res) {
        res.render('search/test', { title: 'Test' });
      },
    List: function(req, res) {
      var redUrl = "https://www.gov.uk/api/content/guidance/red-amber-and-green-list-rules-for-entering-england#red-list"
      https.get(redUrl, function(res){
        console.log(res.statusCode);
        res.on("data", function(data){
          var countryData = JSON.parse(data);
          console.log(countryData.details.body);
        })
      })

      res.render('explore/index');
      
    }
    
}

module.exports = HomeController;