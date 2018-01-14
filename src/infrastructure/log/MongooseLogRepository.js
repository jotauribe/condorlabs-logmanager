'use strict';

import {UserMapper} from "./LogMapper";
import {LogModel} from "./LogModel";

const db = require('mongoose'),
    defaults = require('../../config/defaults'),
    connectionString = defaults['database_connection_string'];

export default class LogRepository{

    async add(log){

        const newLog = await LogModel.create( UserMapper.toJSON(log) );
        return newLog;

    };

    async getAll(query){
        return await LogModel.find(query);
    }

    async get(){
        await LogModel.save()
    }

}
