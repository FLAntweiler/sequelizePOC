const { DataTypes} = require('sequelize');

const END_USER_TYPE_DEFINITION =  {
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
    }
}

module.exports = {
    END_USER_TYPE_DEFINITION
};