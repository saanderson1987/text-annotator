var express = require('express');
var router = express.Router();
const transController = require('../controllers/trans_controller');

router.post('/', transController.getTrans);

module.exports = router;
