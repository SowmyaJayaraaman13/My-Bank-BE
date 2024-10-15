const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/accounts');

router.get('/transaction/:transactionId', transactionController.handleGetCardById);
router.get('/transactions', transactionController.handleGetAllCards);
router.post('/transaction', transactionController.hanldeCardCreation);
router.put('/transaction/:transactionId', transactionController.handleCardUpdation);
router.delete('/transaction/:transactionId', transactionController.handleCardDeletion);

module.exports = router


const express = require('express')
const router = express.Router()
const { dbConnection } = require('database\index');

router.get('/transactions', async (req, res) => {
    try {

        let { data, error } = await dbConnection.from('Transaction').select('*');
        if (error) {
            throw { status: 404, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.send(data);
    } catch (error) {
        console.log("Error in getting transactions", error);
        res.status(error.status).json(error.message);
    }
});


router.get('/transactionById', async (req, res) => {
    const { id } = req.params;
    try {
        let { data, error } = await dbConnection.from('Transaction').select('*').eq('id', id);
        if (error) {
            throw { status: 404, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.send(data);
    } catch (error) {
        console.log(`Error in getting transaction with id: ${id}`, error);
        res.status(error.status).json(error.message)
    }
});

router.post('/transaction', async (req, res) => {
    try {

        const transactionPayload = {
            name: req.body.name,
            logo_url: req.body.logo_url,
        }

        const { data, error } = await dbConnection.from('Transaction').insert(transactionPayload).select()

        if (error) {
            throw { status: 201, message: `Error:${JSON.stringify(error.message)}` }
        }

        res.send(data);
    } catch (error) {
        console.log("Error in creating transaction", error);
        res.status(error.status).json(error.message)
    }
});

router.put('/transaction', async (req, res) => {
    const { id } = req.params;
    const { payload } = req.body;
    try {
        const updatedPayload = {
            ...payload,
        }
        const { data, error } = await dbConnection.from('Transaction').update(updatedPayload).eq('id', id).select();
        if (error) {
            throw { status: 201, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.send(data);
    } catch (error) {
        console.log("Error in updating transaction", error);
        res.status(error.status).json(error.message)
    }
});


router.delete('/transaction', async (req, res) => {
    const { id } = req.params;
    try {
        let { data, error } = await dbConnection.from('Transaction').delete().eq('id', id).select();
        if (error) {
            throw { status: 404, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.status(data.status).json('Successfully deleted');
    } catch (error) {
        console.log(`Error in getting transaction with id: ${id}`, error);
        res.status(error.status).json(error.message)
    }
});


module.exports = router