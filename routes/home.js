var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
// router.get('/signup', HomeController.SignupPage)
// router.post('/new', HomeController.Create);
router.get('/explore', HomeController.List);

router.get('/profile', HomeController.Profile);
router.post('/addCountry', HomeController.UpdateProfileFaveCountry);


module.exports = router;
