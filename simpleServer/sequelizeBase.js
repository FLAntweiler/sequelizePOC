const { Sequelize } = require('sequelize');
const {
    connection,
    database,
    username,
    password,
} = require('./config');


// could publish log to graylog or somewhere else instead.
const handleLog = msg => {
    console.log(msg);
}

const sequelize = new Sequelize(database, username, password, {
    host: connection,
    port: 1433,
    dialect: "mssql",
    dialectOptions: {
        port: 1433,
    },
    logging: handleLog
})

module.exports = sequelize