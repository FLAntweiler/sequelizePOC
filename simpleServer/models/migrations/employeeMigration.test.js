const assert = require('assert');
const { updateEmployee } = require('./employeeMigration');
const sequelize = require('../../sequelizeBase');
const Employee = require('../typeDefinitions/employee/employeeBaseModel');



describe('Employee Migration', () => {
    beforeEach(async () => {
        await sequelize.define("Employee", {}, { sequelize })
        await sequelize.sync({ force: true });
    })
    it('Should run all migrations for employee', async () => {
        const TEST_EMPLOYEE = {
            firstName: "test first name",
            lastName: "test last name",
            middleName: "test middleName"
        }
        let actual;
        try {
            updateEmployee();
            const createResult = await Employee.create(TEST_EMPLOYEE);
            const findAllResult = await Employee.findAll({ where: {
                id: createResult.id,
            }});
            actual = findAllResult[0];
        } catch (error) {
            console.log("ERROR HAPPENED", error)
            throw new Error("Error occored in test", error)
        }
        assert.equal(actual.firstName, TEST_EMPLOYEE.firstName)
        assert.equal(actual.lastName, TEST_EMPLOYEE.lastName)
        assert.equal(actual.middleName, TEST_EMPLOYEE.middleName)
    })
})