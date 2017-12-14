'use strict';


var LogService = require('../services/log.service');

exports.getLogs = function (request, response) {
    LogService.getMostRecentLogInDatabase(request.query, function (error, logs) {
        //var date = logs[0].dt_Start_Log;
        //console.log(date);
        LogService.getLogsFromAPI(request.query, logs[0], function (error, logs) {
            if (error) response.send(logs);
            console.log(logs.length)
            response.send(logs);
        });
    });
}