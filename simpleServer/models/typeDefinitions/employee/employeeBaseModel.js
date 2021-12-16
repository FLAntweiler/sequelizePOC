const sequelize = require('../../../sequelizeBase');
const { MODEL_OPTIONS_V1 } = require('./typeDefinitionV1');
const { EMPLOYEE_TYPE_DEFINITION_V2 } = require('./typeDefinitionV2');

const Employee = sequelize.define("Employee", EMPLOYEE_TYPE_DEFINITION_V2, MODEL_OPTIONS_V1)


module.exports = Employee;