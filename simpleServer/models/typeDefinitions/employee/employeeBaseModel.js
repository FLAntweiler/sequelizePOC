const sequelize = require('../../../sequelizeBase');
const BASE_MODEL_OPTIONS = require('../baseOptions');
const { EMPLOYEE_TYPE_DEFINITION_V2 } = require('./typeDefinitionV2');

const Employee = (sequelizeInstance=sequelize) => sequelizeInstance.define(
    "Employee", 
    EMPLOYEE_TYPE_DEFINITION_V2, 
    BASE_MODEL_OPTIONS({
        sequelize: sequelizeInstance,
        createdAt: false,
    })
    )


module.exports = Employee;