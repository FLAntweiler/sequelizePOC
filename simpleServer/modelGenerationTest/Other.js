const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Other', {
    firstName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Other',
    schema: 'dbo',
    timestamps: false
  });
};
