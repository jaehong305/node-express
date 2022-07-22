const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('device', {});
});

module.exports = router;
