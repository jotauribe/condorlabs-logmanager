'use strict';

import Service from "../Service";

class CreateLog extends Service {

    constructor({ usersRepository }) {
        super();
        this.usersRepository = usersRepository;
    }

    async execute(logData) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        const log = new User(logData);

        try {

            const newLog = await this.usersRepository.add(log);

            this.emit(SUCCESS, newLog);
        } catch(error) {
            if(error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
}

CreateLog.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateLog;