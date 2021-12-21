const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Other', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
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
    timestamps: false,
    indexes: [
      {
        name: "PK__Other__3213E83F0B75B270",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK__Other__3213E83F1C042BD4",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK__Other__3213E83F2B71CF4F",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
