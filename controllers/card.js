
const cardService = require('../services/api/card');


const handleGetCardById = async (req, res) => {
    const { params, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const card = await cardService.getCardById({ params, accountId, userId });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleGetCardById: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleGetAllCards = async (req, res) => {
    const { account: { id: accountId }, user: { id: userId } } = req;
    try {
        
        const cards = await cardService.getAllCards({ accountId, userId });
        res.status(201).json(cards);

    } catch (error) {
        console.log(`Error in handleGetAllCards: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}

const hanldeCardCreation = async (req, res) => {
    const { body, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const card = await cardService.createCard({ body, accountId, userId });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in hanldeCardCreation: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCardUpdation = async (req, res) => {
    const { body, account: { id: accountId }, params: { cardId} } = req;
    try {

        const card = await cardService.updateCard({ body, accountId, cardId });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleCardUpdation: ${error} for account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCardDeletion = async (req, res) => {
    const { account: { id: accountId }, params } = req;
    try {

        const card = await cardService.deleteCard({ accountId, params });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleCardDeletion: ${error} for account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleGetCardById,
    handleGetAllCards,
    hanldeCardCreation,
    handleCardUpdation,
    handleCardDeletion
}