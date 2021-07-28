var https = require("https");
var countryList = require("country-list");

var HomeController = {
    Index: function(req, res) {
        res.render('search/test', { title: 'Test' });
    },

    List: function(req, res) {

      var url = "https://www.gov.uk/api/content/guidance/red-amber-and-green-list-rules-for-entering-england";
      

      https.get(url, function(response){
        var result = "";
        
        response.on("data", function(data){
          result += data;
        })

        response.on("end", function(){
          var resultJSON = JSON.parse(result);
          var pageData = resultJSON.details.body;

          pageData = pageData.replace(/(<([^>]+)>)/gi, "");

          var countriesRef = countryList.getNames();

          // var redStartInd = pageData.search("Afghanistan");
          // var redEndInd = pageData.search("Zimbabwe");

          var redList = pageData.slice(830, 3260);
          var filteredRedList = [];

          for(var i=0; i<countriesRef.length; i++) {
            var redCountry = redList.search(countriesRef[i]);
            if(redCountry > -1) {
              filteredRedList.push(countriesRef[i]);
            }
          }
          
          filteredRedList = filteredRedList.sort();
          
          res.render('explore/index', { redListData: filteredRedList })
        })
      })
      
    }
    
}

module.exports = HomeController;