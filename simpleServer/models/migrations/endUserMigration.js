const EndUser = require('../typeDefinitions/endUser/endUserBaseModel');

const updateEndUser = async () => {
    // Actually update the table
    await EndUser.sync({ 
        // force: true // will drop the table if it exists
        alter: true // will drop columns or add columns on existing table
    })
}

module.exports = {
    updateEndUser
}

updateEndUser();