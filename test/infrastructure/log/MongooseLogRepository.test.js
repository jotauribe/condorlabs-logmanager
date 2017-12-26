"use strict"

require('app-module-path').addPath(__dirname+'../../../');

import LogRepository from '../../../src/infrastructure/log/MongooseLogRepository';
import {Log} from "domain";

test('Logs with the same log should be equals', () => {
    Log.buildFromJSON({});
    let lr = new LogRepository();
    lr.add({});

});