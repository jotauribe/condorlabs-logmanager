'use strict';

import {UserMapper} from "./LogMapper";
import {LogModel} from "./MongooseLogModel";

export default class LogRepository{

    async add(log){

        const newLog = await LogModel.create( UserMapper.toJSON(log) );
        return newLog;

    };

    async getAll(query){
        return await LogModel.find(query);
    }

    async get(params, select, skip, limit, sort){
        return await LogModel
            .find(params)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select(select)
            .exec();
    }

}
