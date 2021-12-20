const assert = require('assert');
const { updateEmployee } = require('./employeeMigration');
const sequelize = require('../../sequelizeTestBase');



describe('Employee Migration', () => {
    it('Should run all migrations for employee', () => {
        try {
            updateEmployee(sequelize);
        } catch (error) {
            console.log("ERROR HAPPENED", error)
            throw new Error("Error occored in test", error)
        }
    })
})