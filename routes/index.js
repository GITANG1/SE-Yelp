var express = require('express');
var router = express.Router();

/**
 * Alert the user to use appropriate route
 *
 * @section projects
 * @type get
 * @url /
 */
router.get('/', function (req, res, next) {
  res.send('Please use appropriate route');
});

module.exports = router;
