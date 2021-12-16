const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

const employeeRoutes = require('./routes/employee');

app.use(express.json())
app.use("/employee", employeeRoutes);


app.listen(port, () => {
    console.log(`Sequelize example listening at http://localhost:/${port}`)
})