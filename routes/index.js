var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env)
  res.render('index', { title: 'pratArch' });
});

module.exports = router;
