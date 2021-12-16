const { DataTypes, UUIDV4 } = require('sequelize');

// using freeze here to prevent object mutation.
const EMPLOYEE_TYPE_DEFINITION_V2 =  {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    middleName: {
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
    EMPLOYEE_TYPE_DEFINITION_V2
};