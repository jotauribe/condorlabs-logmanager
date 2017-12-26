"use strict";

const date_regex = require('../../config/defaults')['date_regex'];

export class Assert{

    static DATE_REGEX = date_regex;

    /**
     *
     * @param value: a value to be validated
     * @param type: the expected type of the value parameter
     * @param message: a message to be thrown as description of the error
     */
    static isTypeOf(value, type, message = 'IsTypeOf Error: Invalid Argument'){
        if (typeof value !== type)
            throw new Error(message);
    }

    /**
     *
     * @param object: a object to be validated
     * @param objectType: the expected object type from which the object was constructed
     * @param message: a message to be thrown as description of the error
     */
    static isInstanceOf(object, objectType, message = 'IsInstanceOf Error: Invalid Argument'){
        if (object instanceof objectType)
            throw new Error(message);
    }

    /**
     *
     * @param dateString: a date string to be validated
     * @param message: a message to be thrown as description of the error
     */
    static isValidDate(dateString, message = 'Invalid Argument')
    {
        //First check for the pattern (MM/DD/YYYY OR MM-DD-YYYY)
        if(!this.DATE_REGEX.test(dateString))
            throw new Error(message);

        let separator = /\//.test(dateString)? '/' : '-';

        // Parse the date parts to integers
        var parts = dateString.split(separator);
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            throw new Error(message);

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        if(!(day > 0 && day <= monthLength[month - 1]))
            throw new Error(message);
    };
}