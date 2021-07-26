var TestController = {
    Index: function(req, res) {
        res.render('search/test', { title: 'Test' });
      },
}

module.exports = TestController;