const sequelize = require('../../sequelizeBase');

const BASE_MODEL_OPTIONS = {
    sequelize,
    // some cool params that you can set (works for the other decalaration method too)
    timestamps: true,
    createdAt: true,
    freezeTableName: true,
    // want updatedAt timestamp to be called "updateTimestamp"
    updatedAt: "updateTimestamp",
};

module.exports = BASE_MODEL_OPTIONS