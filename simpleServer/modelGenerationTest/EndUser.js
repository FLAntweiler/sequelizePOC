const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EndUser', {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    middleName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updateTimestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'EndUser',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__EndUser__3213E83F2500F720",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
