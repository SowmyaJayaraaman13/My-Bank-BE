const express = require('express')
const router = express.Router()
const { dbConnection } = require('../database');

router.get('/cards', async (req, res) => {
    try {

        let { data, error } = await dbConnection.from('Card').select('*');
        if (error) {
            throw { status: 404, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.send(data);
    } catch (error) {
        console.log("Error in getting cards", error);
        res.status(error.status).json(error.message);
    }
});


router.get('/cardById', async (req, res) => {
    const { id } = req.params;
    try {
        let { data, error } = await dbConnection.from('Card').select('*').eq('id', id);
        if (error) {
            throw { status: 404, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.send(data);
    } catch (error) {
        console.log(`Error in getting card with id: ${id}`, error);
        res.status(error.status).json(error.message)
    }
});

router.post('/card', async (req, res) => {
    try {

        const cardPayload = {
            name: req.body.name,
            logo_url: req.body.logo_url,
        }

        let result;

        const { data, error } = await dbConnection.from('Card').insert(cardPayload).select()

        if (error) {
            throw { status: 201, message: `Error:${JSON.stringify(error.message)}` }
        }

        res.send(data);
    } catch (error) {
        console.log("Error in creating card", error);
        res.status(error.status).json(error.message)
    }
});

router.put('/card', async (req, res) => {
    const { id } = req.params;
    const { payload } = req.body;
    try {
        const updatedPayload = {
            ...payload,
        }
        const { data, error } = await dbConnection.from('Card').update(updatedPayload).eq('id', id).select();
        if (error) {
            throw { status: 201, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.send(data);
    } catch (error) {
        console.log("Error in updating card", error);
        res.status(error.status).json(error.message)
    }
});


router.delete('/card', async (req, res) => {
    const { id } = req.params;
    try {
        let { data, error } = await dbConnection.from('Card').delete().eq('id', id).select();
        if (error) {
            throw { status: 404, message: `Error:${JSON.stringify(error.message)}` }
        }
        res.status(data.status).json('Successfully deleted');
    } catch (error) {
        console.log(`Error in getting card with id: ${id}`, error);
        res.status(error.status).json(error.message)
    }
});



module.exports = router