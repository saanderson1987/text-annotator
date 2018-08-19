var express = require('express');
var router = express.Router();
var path = require('path');
const Text = require('../models/text.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  Text.getAll()
    .then((data) => {
      res.render('base', {view: 'home', texts: data});
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
