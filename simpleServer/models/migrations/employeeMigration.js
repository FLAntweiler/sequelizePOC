const Employee = require('../typeDefinitions/employee/employeeBaseModel');

const updateEmployee = async (sequelizeInstance) => {
    // Actually update the table
    await Employee(sequelizeInstance).sync({ 
        // force: true // will drop the table if it exists
        alter: true // will drop columns or add columns on existing table
    })
}

module.exports = {
    updateEmployee
}
