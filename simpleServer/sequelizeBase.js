const { Sequelize } = require('sequelize');

const connection = process.env.PROVIDER_DB_SERVER || "localhost";
const database = process.env.PROVIDER_DB_DATABASE || "testdb";
const username = process.env.PROVIDER_DB_USERNAME || "sa";
const password = process.env.PROVIDER_DB_PASSWORD || "reallyStrong(!)password";

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