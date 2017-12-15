'use strict';

var http = require('https'),
    mongoose = require('mongoose'),
    async = require('async'),
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
       .limit(1)
       .sort('-dt_Start_Log')
       .select('cd_cebroker_state '
              +'pro_cde cd_profession '
              +'id_license '
              +'dt_end '
              +'cd_environment '
              +'dt_Start_Log '
              +'ds_compl_status_returned '
              +'dt_end_log '
              +'cd_machine '
              +'id_client_nbr')
       .exec(function (error, log) {
           if (error) callback(error, null);
           if(log[0]){
               var nLog = JSON.parse(JSON.stringify(log[0]));
               console.log("el original: ",nLog, "date: ", nLog.dt_Start_Log);
           }
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
                var i = 0;
                body = body.replace(logsGroupRegex, function (substring) {
                    var logFromAPI = JSON.parse(substring);

                    if(until){
                        let logAPIDate = new Date(logFromAPI.dt_Start_Log);
                        if(logAPIDate.getTime() < until.dt_Start_Log.getTime()){
                            response.destroy();
                        } else{
                            if (logAPIDate.getTime() == until.dt_Start_Log.getTime()){
                                var newLog = new Log(logFromAPI);
                                Log.findOneAndUpdate(
                                    logFromAPI,
                                    logFromAPI,
                                    {upsert: true, sort: {'dt_Start_Log': -1}},
                                    function (err, log) {
                                        if (log) console.log("DB:  ", log, "  API:  ", logFromAPI);
                                        else logs.push(log);
                                    }
                                );
                            } else{
                                logs.push(logFromAPI);
                                var newLog = new Log(logFromAPI);
                                newLog.save(function(error, log) {
                                    if (error){
                                        callback(error);
                                    }
                                })
                            }}
                    }
                    else{
                        logs.push(logFromAPI);
                        var newLog = new Log(logFromAPI);
                        newLog.save(function(error, log) {
                            if (error) callback(error);
                        })
                    }
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
