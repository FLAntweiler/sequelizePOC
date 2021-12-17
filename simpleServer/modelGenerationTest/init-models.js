var DataTypes = require("sequelize").DataTypes;
var _Employee = require("./Employee");
var _EndUser = require("./EndUser");
var _Other = require("./Other");

function initModels(sequelize) {
  var Employee = _Employee(sequelize, DataTypes);
  var EndUser = _EndUser(sequelize, DataTypes);
  var Other = _Other(sequelize, DataTypes);


  return {
    Employee,
    EndUser,
    Other,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
