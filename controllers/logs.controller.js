'use strict';


var LogService = require('../services/log.service');

exports.getLogs = function (request, response) {

    LogService.getLogsFromAPI(request.query, function (error, logs) {
        if (error) response.send(logs);
        response.send(logs);
    });
}