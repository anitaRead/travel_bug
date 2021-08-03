var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

// router.get('/signup', HomeController.SignupPage)
// router.post('/new', HomeController.Create);
router.get('/', HomeController.SigninPage);
router.post('/new', HomeController.Signin);
router.post('/end', HomeController.Signout);

module.exports = router;
