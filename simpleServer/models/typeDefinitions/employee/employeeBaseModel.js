const sequelize = require('../../../sequelizeBase');
const BASE_MODEL_OPTIONS = require('../baseOptions');
const { EMPLOYEE_TYPE_DEFINITION_V2 } = require('./typeDefinitionV2');

const Employee = sequelize.define(
        "Employee", 
        EMPLOYEE_TYPE_DEFINITION_V2, 
        Object.assign(BASE_MODEL_OPTIONS, { createdAt: false })
    )


module.exports = Employee;