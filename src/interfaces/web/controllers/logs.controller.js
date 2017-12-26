'use strict';


var LogService = require('../../../application/services/log.service');

exports.getLogs = function (request, response) {
    LogService.getMostRecentLogInDatabase(request.query, function (error, dbLogs) {
        LogService.getLogsFromAPI(request.query, dbLogs[0], function (error, logs) {
            if (error) response.send(logs);
            console.log("Number of logs: ",logs.length)
            response.send(logs);
        });
    });
}