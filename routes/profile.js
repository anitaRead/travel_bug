var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/explore', HomeController.List);
router.get('/', HomeController.Profile);
router.post('/addCountry', HomeController.UpdateProfileFaveCountry);

module.exports = router;
