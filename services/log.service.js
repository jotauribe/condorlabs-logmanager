'use strict';

var http = require('https'),
    mongoose = require('mongoose'),
    async = require('async'),
    URL = require('url'),
    Log = require('../models/log.model'),
    Request = require('../models/request.model'),
    defaults = require('../config/defaults'),
    connectionURL = defaults['database_connection_string'],
    apiUrl = defaults['logs_endpoint'];

mongoose.Promise = global.Promise;
mongoose.connect(connectionURL);

var logsGroupRegex = /({[^{}]+})+/g;


exports.getMostRecentLogInDatabase = function (query, callback) {
    var initTime = new Date();
    var queryObject = buildQueryObject(query);
    //Getting the last generated log
    Log.find(queryObject)
       .sort('-dt_Start_Log')
       .limit(1)
       .select({
            cd_cebroker_state: 1,
            pro_cde: 1,
            cd_profession: 1,
            id_license: 1,
            dt_end: 1,
            cd_environment: 1,
            dt_Start_Log: 1,
            ds_compl_status_returned: 1,
            dt_end_log: 1,
            cd_machine: 1,
            id_client_nbr: 1})
       .exec(function (error, log) {
           if (error) callback(error, null);
           callback(null, log);
       });
}

exports.getLogsFromAPI = function (query, until, callback) {
    var initTime = new Date();
    var url = buildQueryString(query);
    var logs = [];
    console.log("URL: ", url);
    var req = http.get(url, function(response){
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
            process.nextTick(function () {
                body.replace(logsGroupRegex, function (substring) {
                    body = body.substring(substring.length+1);
                    var logData = JSON.parse(substring);
                    console.log(substring);
                    if(until){
                        var aDate = new Date(logData.dt_Start_Log);
                        if(aDate.getTime() < until.dt_Start_Log.getTime()){
                            var endTime = new Date().getTime();
                            var responseTime = endTime - initTime.getTime();
                            var newRequest = new Request({
                                date: initTime,
                                response_time: responseTime,
                                parameters: url
                            });
                            newRequest.save();
                            callback(null, logs);
                        }
                    }
                    logs.push(logData);
                    var newLog = new Log(logData);
                    newLog.save(function(error, log) {
                        if (error){
                            callback(error);
                        }
                    })
                })
            })
        });
        response.on('end', function () {
            var endTime = new Date().getTime();
            var responseTime = endTime - initTime.getTime();
            var newRequest = new Request({
                date: initTime,
                response_time: responseTime,
                parameters: url
            });
            newRequest.save();
            callback(null, logs);
        })

    }).end();
}

var buildQueryObject = function (query) {
    var queryObject = {};
    if(query.startdate) queryObject['dt_Start_Log'] = {$gte: new Date(query.startdate), $lt: new Date(query.enddate)};
    if(query.state) queryObject['cd_cebroker_state'] = query.state;
    return queryObject;
}

var buildQueryString = function(query){
    var queryString = apiUrl;
    if(query.startdate) queryString += 'startdate='+query.startdate+'&';
    if(query.enddate) queryString += 'enddate='+ query.enddate+"&";
    if(query.state) queryString += 'state=' + query.state;
    return queryString;
}
