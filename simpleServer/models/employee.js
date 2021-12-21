const Employee = require('./typeDefinitions/employee/employeeBaseModel');

// insert
const insertEmployee = async (employee) => {
    return await Employee.create({
        firstName: employee.firstName,
        lastName: employee.lastName
    })
}

// select all
const selectAllEmployees = async () => {
    return await Employee.findAll();
}

// select with where
const selectEmployee = async (employeeId) => {
    return Employee.findAll({
        where: {
            id: employeeId
        }
    })
}

// not sure if this is patch or put, but it looks like patch.
const patchEmployee = async (employeeId, employee) => {
    return await Employee.update({
        lastName: employee.lastName,
        firstName: employee.firstName,
        middleName: employee.middleName,
        // fields excluded are not touched. 
    }, {
        where: {
            id: employeeId
        },
        fields: ['firstName', 'lastName', 'middleName'],
    })
}

// delete
const deleteEmployee = async (employeeId) => {
    Employee.destroy({
        where: {
            id: employeeId
        }
    })
}

module.exports = {
    insertEmployee,
    selectAllEmployees,
    selectEmployee,
    patchEmployee,
    deleteEmployee
}