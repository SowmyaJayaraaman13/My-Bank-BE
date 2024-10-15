
const cardService = require('../services/api/card');


const handleGetCardById = async (req, res) => {
    const { params } = req;
    try {

        const card = await cardService.getCardById({ params });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleGetCardById: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleGetAllCards = async (req, res) => {
    try {

        const cards = await cardService.getAllCards();
        res.status(201).json(cards);

    } catch (error) {
        console.log(`Error in handleGetAllCards: ${error}`);
        res.status(400).json({ error: error.message });
    }
}

const hanldeCardCreation = async (req, res) => {
    const { body } = req;
    try {

        const card = await cardService.createCard({ body });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in hanldeCardCreation: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCardUpdation = async (req, res) => {
    const { body } = req;
    try {

        const card = await cardService.updateCard({ body });
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleCardUpdation: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCardDeletion = async (req, res) => {
    try {

        const card = await cardService.deleteCard();
        res.status(201).json(card);

    } catch (error) {
        console.log(`Error in handleCardDeletion: ${error}`);
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