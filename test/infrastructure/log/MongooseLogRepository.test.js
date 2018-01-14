
import LogRepository from '../../../src/infrastructure/log/MongooseLogRepository';
import {Log} from "../../../src/domain";

describe('MongooseLogRepository', () => {

    beforeAll(()=>{
        db.Promise = global.Promise;
        db.connect(connectionString, {useMongoClient: true});
    });

    afterAll((done)=>{
        db.disconnect(done);
    });

    describe('buildFromJSON()', ( ) => {
        test('Logs with the same attributes should be equals', async () => {
            const log = Log.buildFromJSON({
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
                cd_machine: ""});
            let lr = new LogRepository();
            const newLog = await lr.add(log);
        });
    });
});
