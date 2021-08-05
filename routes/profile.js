var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Profile);
router.get('/edit', HomeController.EditPage);
router.post('/edit/username', HomeController.EditUsername);
router.post('/edit/vaccination', HomeController.EditVaccine);
router.post('/addCountry', HomeController.UpdateProfileFaveCountry);
router.post('/reset', HomeController.RemoveProfileFaveCountry);

module.exports = router;
