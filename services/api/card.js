const { dbConnection } = require('../../database/index');

const { queryAllCardsOrByIds } = require('../../helpers/card');

// let ids = [1,2];
// const conditions = {
//     name: { eq: "Kandha"},
// }

const getCardById = async ({ accountId, userId, params }) => {
    const { cardId } = params;
    try {

        const conditions = {
            user_id: { eq: userId },
            account_id: { eq: accountId },
            id: { in: [cardId] },
        };
        const card = await queryAllCardsOrByIds({ accountId, conditions });
        return card;

    } catch (error) {
        console.log(`Error in getting card with Id: ${cardId} for user: ${userId} and account: ${accountId}`);
        throw error;
    }
};

const getAllCards = async ({ accountId, userId }) => {
    try {

        const conditions = {
            account_id: { eq: accountId },
            user_id: { eq: userId },
        };
        const cards = await queryAllCardsOrByIds({ accountId, conditions });
        return cards;

    } catch (error) {
        console.log(`Error in getting cards: ${JSON.stringify(error)} for user: ${userId} and account: ${accountId}`);
        throw error;
    }
};

const createCard = async ({ accountId, userId, body }) => {
    const { name, number, type, expDate, balance } = body
    try {

        const cardPayload = {
            name,
            number,
            type,
            expiry: expDate,
            balance,
            account_id: accountId,
            user_id: userId,
        };

        const { data, error } = await dbConnection.from('Card').insert(cardPayload).select();

        if (error) {
            throw new Error(`Error:${JSON.stringify(error.message)}`);
        }

        return data;

    } catch (error) {
        console.log(`Error in creating card for user: ${userId} and account: ${accountId}`, error);
        throw error;
    }
};

const updateCard = async ({ accountId, body, cardId }) => {
    const {  } = body;
    try {

        const updatedData = {

        };

        let { data, error } = await dbConnection.from('Card').update(updatedData).eq('id', cardId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in updating card with Id: ${cardId} for account: ${accountId}`);
        throw error;
    }
};

const deleteCard = async ({ accountId, params }) => {
    const { cardId } = params;
    try {

        let { data, error } = await dbConnection.from('Card').delete().eq('id', cardId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in deleting card with Id: ${cardId} for account: ${accountId}`);
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