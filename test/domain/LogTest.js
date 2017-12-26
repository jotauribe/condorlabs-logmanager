"use strict"

import {Log} from '../../src/domain';


test('Logs with the same log should be equals', () => {
    let log = new Log("", 90, "","", "2017-12-12T00:00:00.003", "", 90, "2017-12-12T00:00:00.098890", "2017-12-12T00:00:00.546Z", "", "");
    let logFromJson = Log.buildFromJSON({
        cd_cebroker_state: "",
        pro_cde: 90,
        cd_profession: "",
        id_license: "",
        dt_end: "2017-12-12T00:00:00.003",
        ds_compl_status_returned: "",
        id_client_nbr: 90,
        dt_Start_Log: "2017-12-12T00:00:00.098890",
        dt_end_log: "2017-12-12T00:00:00.546Z",
        cd_environment: "",
        cd_machine: ""})
    expect(log).toEqual(logFromJson);
});

test('Logs creation with invalid dates attributes should throw error', () => {

    expect(()=>{
        let log = new Log(
            "FL",
            90,
            "ME",
            "RN9999999",
            "2017-12-12T00:00:00.error",
            "COMPL",
            90,
            "2017-12-12T00:00:00.098890",
            "2017-12-12T00:00:00.546Z",
            "PRIMARY",
            "JR002"
        );
    }).toThrow();
});