var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
router.get('/signup', HomeController.SignupPage)
router.post('/new', HomeController.Create);
router.get('/sessions', HomeController.SigninPage);
router.post('/sessions/new', HomeController.Signin);
router.post('/sessions/end', HomeController.Signout);
router.get('/explore', HomeController.List);
router.get('/profile', HomeController.Profile);
router.get('/edit', HomeController.EditPage);
router.post('/edit/username', HomeController.EditUsername);
router.post('/edit/vaccination', HomeController.EditVaccine);


module.exports = router;