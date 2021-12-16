const sequelize = require('../../../sequelizeBase');
const { END_USER_TYPE_DEFINITION } = require('./typeDefinitionV1');
const BASE_MODEL_OPTIONS = require('../baseOptions');

const EndUser = sequelize.define("EndUser", END_USER_TYPE_DEFINITION, BASE_MODEL_OPTIONS)


module.exports = EndUser;