

// reading from .env, just need to get these things into sequelize
require('dotenv').config();
const environment = process.env.ENVIRONMENT || "test";
let connection;
let database;
let username;
let password;
if (environment == "test") {
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