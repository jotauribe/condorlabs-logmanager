'use strict';

import {UserMapper} from "./RequestMapper";
import {RequestModel} from "./RequestModel";

const db = require('mongoose'),
      defaults = require('config/defaults'),
      connectionString = defaults['database_connection_string'];

export default class RequestRepository{

    async add(request){
        const newRequest = await RequestModel.create(UserMapper.toJSON(request));
        return newRequest;
    }

    async getAll(query){
        return await RequestModel.find(query);
    }

    async get(){
        await RequestModel.save();
    }

}