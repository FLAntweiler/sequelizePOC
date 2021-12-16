const sequelize = require('../../sequelizeBase');

sequelize.query(`
    DROP PROCEDURE SelectFirstNamesFromEmployees;
`)

sequelize.query(`
    CREATE PROCEDURE SelectFirstNamesFromEmployees
    AS
    SELECT firstName FROM Employee
    GO;
`).then(res =>
    sequelize.query(`
        EXEC SelectFirstNamesFromEmployees
    `).then(res => {
        console.log("Result from stored proc", res)
    })
)

sequelize.query(`
    IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User'))
        SELECT * FROM Employee
`)

sequelize.query(`
    IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'EndUser'))
        CREATE TABLE EndUser
        (
            firstName varchar(200) NOT NULL,
            lastName varchar(200) NULL
        )
`)

// sequelize.query(`
//     IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User'))
//         CREATE TABLE 'User' (
//             firstName VARCHAR,
//             lastName VARCHAR,
//             id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL default NEWID(),
//         )
// `)

