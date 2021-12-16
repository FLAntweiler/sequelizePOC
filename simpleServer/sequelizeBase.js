const { Sequelize } = require('sequelize');

// reading from .env, just need to get these things into sequelize
require('dotenv').config();
const connection = process.env.PROVIDER_DB_SERVER;
const database = process.env.PROVIDER_DB_DATABASE;
const username = process.env.PROVIDER_DB_USERNAME;
const password = process.env.PROVIDER_DB_PASSWORD;

console.log(connection, database, username, password)
// could publish log to graylog or somewhere else instead.
const handleLog = msg => {
    console.log(msg);
}

const sequelize = new Sequelize(database, username, password, {
    host: connection,
    port: 1433,
    // dialect: "postgres",
    dialect: "mssql",
    dialectOptions: {
        port: 1433,
    },
    logging: handleLog
})

module.exports = sequelize