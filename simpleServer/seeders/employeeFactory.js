const faker = require('faker');
const Employee = require('../models/typeDefinitions/employee/employeeBaseModel');

const seedData = async (props = {}) => {
    const defaultProps = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.firstName(),
    }
    return Object.assign({}, defaultProps, props);
}

const seedEmployee = async (seedOverides={}) => Employee.create(await seedData(seedOverides));

module.exports = {
    seedEmployee
}