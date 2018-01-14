module.exports = {

    database: 'condorlabs-logs',
    database_connection_string : 'mongodb://user:password@ds141406.mlab.com:41406/condorlabs',
    logs_endpoint: 'https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?',
    date_regex: /^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]))(T(20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1})(\.\d{3}(\d{3}|Z)?)?)?$/

};