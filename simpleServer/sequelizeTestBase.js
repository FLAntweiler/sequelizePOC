const { Sequelize } = require('sequelize');

const connection = process.env.TEST_DB_SERVER || "localhost";
const database = process.env.TEST_DB_DATABASE || "testdbfortest";
const username = process.env.TEST_DB_USERNAME || "sa";
const password = process.env.TEST_DB_PASSWORD || "reallyStrong(!)password";

// could publish log to graylog or somewhere else instead.
const handleLog = msg => {
    console.log(msg);
}

const sequelizeTestInstance = new Sequelize(database, username, password, {
    host: connection,
    port: 1433,
    // dialect: "postgres",
    dialect: "mssql",
    dialectOptions: {
        port: 1433,
    },
    logging: handleLog
})

module.exports = sequelizeTestInstance