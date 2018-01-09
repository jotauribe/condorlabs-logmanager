"use strict"

import {Log} from '../../src/domain';


describe('Log Domain Model', ( ) => {
    describe('Log equality', ( ) => {
        test('should be true when logs with same attributes are compared', ( ) => {
            let log = new Log(
                "FL",
                702,
                "DH",
                "24446",
                "2017-12-12T00:00:00.003",
                "IN_PROG",
                1,
                "2017-12-12T00:00:00.098890",
                "2017-12-12T00:00:00.546Z",
                "PRIMARY",
                "JAX02");

            let logFromJson = Log.buildFromJSON({
                cd_cebroker_state: "FL",
                pro_cde: 702,
                cd_profession: "DH",
                id_license: "24446",
                dt_end: "2017-12-12T00:00:00.003",
                ds_compl_status_returned: "IN_PROG",
                id_client_nbr: 1,
                dt_Start_Log: "2017-12-12T00:00:00.098890",
                dt_end_log: "2017-12-12T00:00:00.546Z",
                cd_environment: "PRIMARY",
                cd_machine: "JAX02"})
            expect(log).toEqual(logFromJson);
        });
    });

    describe('Log constructor', ( ) => {
        test('Should throw error when is called with invalid date type attributes ', () => {

            expect( ( ) => {
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
    });
})