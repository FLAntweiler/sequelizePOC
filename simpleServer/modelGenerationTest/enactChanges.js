const initModels = require('./init-models');
const sequelize = require('../sequelizeBase');
const {
    Employee,
    EndUser,
    Other
} = initModels(sequelize);

Employee.sync({ force: true });
EndUser.sync({ force: true });
Other.sync({ force: true });