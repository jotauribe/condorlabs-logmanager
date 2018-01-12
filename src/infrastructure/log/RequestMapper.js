'use strict';

import Model from "../../domain/Request";

export const UserMapper = {
    
    toEntity({dataValues}){
        return new Model(
            dataValues.response_time,
            dataValues.date,
            dataValues.parameters          
        );
    },

    toJSON(entity){
        return {
            response_time: entity.response_time,
            date: entity.date,
            parameters: entity.parameters
        }
    }
};