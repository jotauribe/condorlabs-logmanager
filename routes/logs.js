var express = require('express');
var router = express.Router();
var LogController = require('../controllers/logs.controller');

/* GET Logs listing. */
router.get('/', function(req, res, next) {
    LogController.getLogs(req, res)
});

module.exports = router;