"use strict";

import {Assert} from './Model';

export default class Request{
    
    constructor(response_time, date, parameters){
        this.response_time = response_time;
        this.date = date;
        this.parameters = parameters;
    }


    
    set response_time(response){
        Assert.isTypeOf(response, 'number', "Response time must be a number");
        this._response_time = response_time;
    }

    set date(date){
        Assert.isValidDate(date, `${date} isn't a valid date`);
        this._date = date;
    }

    set parameters(parameters){
        Assert.isTypeOf(parameters, 'string', "Parameters must be a string");
        this._parameters = parameters;
    }



    get response_time(){
        return this._response_time;
    }

    get date(){
        return this._date;
    }

    get parameters(){
        return this._parameters;
    }

}
