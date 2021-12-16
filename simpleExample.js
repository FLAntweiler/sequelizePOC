const { Sequelize, Model, DataTypes, UUIDV4 } = require('sequelize');

// reading from .env, just need to get these things into sequelize
require('dotenv').config();
const connection = process.env.PROVIDER_DB_SERVER;
const database = process.env.PROVIDER_DB_DATABASE;
const username = process.env.PROVIDER_DB_USERNAME;
const password = process.env.PROVIDER_DB_PASSWORD;

// could publish log to graylog or somewhere else instead.
const handleLog = msg => {
    console.log(msg);
}

const sequelize = new Sequelize(`${connection}/${database}`, username, password, {
    host: "localhost",
    dialect: "mssql",
    logging: handleLog
})


// to validate connection:
const authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established")
    } catch (error) {
        console.log("Unable to connect to the database: ", error)
    }
}


// to close connection (will remain open by default)
const closeConnection = async () => {
    await sequelize.close();
}


// model:
const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    }
}, {
    // other options can go here.
    freezeTableName: true // table name will be the same as the model name, in this case "User"
    // tableName: 'Employee'; // Other option for specifying a tablename.
})

const updateUserTable = async () => {
    await User.sync({ 
        // force: true // will drop the table if it exists
        alter: true // will drop columns or add columns on existing table
    }) 
}
const updateAllTables = async () => {
    sequelize.sync({
        // force: true,
        // alter: true,
    }) // defaults to no force and no alter. Here it would just create tables that dont exist.
}
const dropUserTable = async () => {
    await User.drop();
}
const dropAllTables = () => {
    sequelize.drop();
}


//////////////////////
//// QUERIES ////////
////////////////////

// insert a user into the user table:
const insertUser = async (user) => {
    return await User.create({
        firstName: user.firstName,
        lastName: user.lastName
    })
}

// select all
const selectAllUsers = async () => {
    return await User.findAll();
}

// select with where
const selectAUser = async (userId) => {
    return User.findAll({
        where: {
            id: userId
        }
    })
}

// patch
// put functionality
const patchAUser = async (userId, user) => {
    return await User.update({
        lastName: user.lastName,
        firstName: user.firstName // fields excluded are not touched. 
    }, {
        where: {
            id: userId
        },
        fields: ['firstName', 'lastName'],
        transaction: new Transaction(sequelize, )
    })
}


const deleteAUser = async (userId) => {
    User.destroy({
        where: {
            id: userId
        }
    })
}