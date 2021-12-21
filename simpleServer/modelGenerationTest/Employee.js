const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    middleName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    updateTimestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Employee',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Employee__3213E83F18F19B36",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK__Employee__3213E83F2D350DF9",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK__Employee__3213E83F5769307B",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK__Employee__3213E83FC2D411C0",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
