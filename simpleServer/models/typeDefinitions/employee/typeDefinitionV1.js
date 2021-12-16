const { DataTypes, UUIDV4 } = require('sequelize');
const BASE_MODEL_OPTIONS = require('../baseOptions');

const MODEL_OPTIONS_V1 = {
    ...BASE_MODEL_OPTIONS,
    createdAt: false,
}

// using freeze here to prevent object mutation.
const EMPLOYEE_TYPE_DEFINITION =  {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    }
}

module.exports = {
    EMPLOYEE_TYPE_DEFINITION,
    MODEL_OPTIONS_V1
};