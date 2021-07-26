var express = require('express');
var router = express.Router();

var TestController = require('../controllers/test');

router.get('/', TestController.Index);

module.exports = router;