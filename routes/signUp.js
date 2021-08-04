var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.SignupPage)
router.post('/newUser', HomeController.Create);

module.exports = router;
