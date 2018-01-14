'use strict';

import Log from "../../domain/Log";

export const UserMapper = {
    toEntity({ dataValues }) {

        return new Log(
            dataValues.cd_cebroker_state,
            dataValues.pro_cde,
            dataValues.cd_profession,
            dataValues.id_license,
            dataValues.dt_end,
            dataValues.ds_compl_status_returned,
            dataValues.id_client_nbr,
            dataValues.dt_Start_Log,
            dataValues.dt_end_log,
            dataValues.cd_environment,
            dataValues.cd_machine);
    },

    toJSON(entity) {
        return {
            cd_cebroker_state: entity.state,
            pro_cde: entity.proCode,
            cd_profession: entity.profession,
            id_license: entity.licenseID,
            dt_end: entity.cycleEndDate,
            ds_compl_status_returned: entity.complianceStatus,
            id_client_nbr: entity.clientID,
            dt_Start_Log: entity.startLogDate,
            dt_end_log: entity.endLogDate,
            cd_environment: entity.environment,
            cd_machine: entity.machine
        }
    }
};