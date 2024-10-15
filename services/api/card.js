

const { dbConnection } = require('../../database/index');

const { generateRandomSecret, generateJwtToken } = require('../../helpers/account');


const getCardById = async ({ params }) => {
    const { cardId } = params;
    try {

        let { data, error } = await dbConnection.from('Card').select('*').eq('id', cardId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in getting card with Id: ${cardId}`);
        throw error;
    }
};

const getAllCards = async () => {
    try {

        let { data, error } = await dbConnection.from('Card').select('*');

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in getting cards: ${JSON.stringify(error)}`);
        throw error;
    }
};

const createCard = async ({ body }) => {
    const { name, number, type, exp_date, balance } = body
    try {

        const cardPayload = {
            name,
            number,
            type,
            expiry: exp_date,
            balance,
        };

        const { data, error } = await dbConnection.from('Card').insert(cardPayload).select();

        if (error) {
            throw new Error(`Error:${JSON.stringify(error.message)}`);
        }

        return data;

    } catch (error) {
        console.log("Error in creating card", error);
        throw error;
    }
};

const updateCard = async ({ params }) => {
    const { cardId } = params;
    try {

        const updatedData = {

        };

        let { data, error } = await dbConnection.from('Card').update(updatedData).eq('id', cardId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in updating card with Id: ${cardId}`);
        throw error;
    }
};

const deleteCard = async ({ params }) => {
    const { cardId } = params;
    try {

        let { data, error } = await dbConnection.from('Card').delete().eq('id', cardId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in deleting card with Id: ${cardId}`);
        throw error;
    }
};


module.exports = {
    getCardById,
    getAllCards,
    createCard,
    updateCard,
    deleteCard,
}