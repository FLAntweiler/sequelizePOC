require('dotenv').config()

let connection;
let database;
let username;
let password;

const ENVIRONMENT = process.env.NODE_ENV;

switch (ENVIRONMENT) {
    case "development":
        connection = process.env.PROVIDER_DB_SERVER || "localhost";
        database = process.env.PROVIDER_DB_DATABASE || "testdb";
        username = process.env.PROVIDER_DB_USERNAME || "sa";
        password = process.env.PROVIDER_DB_PASSWORD || "reallyStrong(!)password";
        break;
    case "test":
        connection = process.env.TEST_DB_SERVER || "localhost";
        database = process.env.TEST_DB_DATABASE || "testdbfortest";
        username = process.env.TEST_DB_USERNAME || "sa";
        password = process.env.TEST_DB_PASSWORD || "reallyStrong(!)password";
        break;
    default:
        connection = process.env.PROVIDER_DB_SERVER || "localhost";
        database = process.env.PROVIDER_DB_DATABASE || "testdb";
        username = process.env.PROVIDER_DB_USERNAME || "sa";
        password = process.env.PROVIDER_DB_PASSWORD || "reallyStrong(!)password";
}

module.exports = {
    connection,
    database,
    username,
    password,
}