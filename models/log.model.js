var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    cd_cebroker_state: String,
    pro_cde: Number,
    cd_profession: String,
    id_license: String,
    dt_end: Date,
    cd_environment: String,
    dt_Start_Log: Date,
    ds_compl_status_returned: String,
    dt_end_log: Date,
    cd_machine: String,
    id_client_nbr: Number
});

module.exports = mongoose.model('Logs', LogSchema);