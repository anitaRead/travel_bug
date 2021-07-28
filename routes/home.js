var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
router.get('/signup', HomeController.SignupPage)
router.post('/new', HomeController.Create);
router.get('/sessions', HomeController.SigninPage);
router.post('/sessions/new', HomeController.Signin);
router.post('/sessions/end', HomeController.Signout);

router.get('/logo', HomeController.Logo);

module.exports = router;