const express = require('express');
const router = express.Router();
const {
    insertEmployee,
    selectAllEmployees,
    selectEmployee,
    patchEmployee,
    deleteEmployee
} = require('../models/employee');

router.get('/', async (req, res) => {
    try {
        const allEmployees = await selectAllEmployees();
        res.status(200).send(allEmployees)
    } catch (error) {
        console.log("Error fetching all employees: ", error);
        res.status(500).send();
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const selectedEmployee = await selectEmployee(id);
        if (selectedEmployee.length < 1) {
            res.status(404).send();
        } else {
            res.status(200).send(selectedEmployee)
        }
       
    } catch (error) {
        console.log(`Error fetching employee with id: ${id} `, error);
        res.status(500).send();
    }
}) 

router.post('/', async (req, res) => {
    try {
        const employee = req.body;
        const createdEmployee = await insertEmployee(employee);
        res.status(200).send(createdEmployee)
    } catch (error) {
        console.log("Error creating employee: ", error);
        res.status(500).send();
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const employee = req.body;
        const employeeToUpdate = await selectEmployee(id);
        if (employeeToUpdate.length < 1) {
            res.status(404).send();
        } else {
            const updatedEmployee = await patchEmployee(id, employee);
            res.status(200).send(updatedEmployee)
        }
    } catch (error) {
        console.log(`Error patching employee with id: ${id} `, error);
        res.status(500).send();
    } 
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const employeeToDelete = await selectEmployee(id);
        if (employeeToDelete.length < 1) {
            res.status(404).send();
        } else {
            const deleteEmployeeResult = await deleteEmployee(id);
            res.status(204).send(deleteEmployeeResult)
        }
    } catch (error) {
        console.log(`Error deleting employee with id: ${id} `, error);
        res.status(500).send();
    }
})

module.exports = router;