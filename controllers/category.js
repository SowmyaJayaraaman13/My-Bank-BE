
const categoryService = require('../services/api/category');


const handleGetCategoryById = async (req, res) => {
    const { params, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const category = await categoryService.getCategoryById({ params, accountId, userId });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleGetCategoryById: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}

const handleGetAllCategories = async (req, res) => {
    const { account: { id: accountId }, user: { id: userId } } = req;
    try {

        const categories = await categoryService.getAllCategories({ accountId, userId });
        res.status(201).json(categories);

    } catch (error) {
        console.log(`Error in handleGetAllCategories: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}

const handleCategoryCreation = async (req, res) => {
    const { body, account: { id: accountId }, user: { id: userId } } = req;
    try {

        const category = await categoryService.createCategory({ body, accountId, userId });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleCategoryCreation: ${error} for user: ${userId} and account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCategoryUpdation = async (req, res) => {
    const { body, account: { id: accountId }, params: { categoryId} } = req;
    try {

        const category = await categoryService.updateCategory({ body, accountId, categoryId });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleCategoryUpdation: ${error} for account: ${accountId}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCategoryDeletion = async (req, res) => {
    const { account: { id: accountId }, params } = req;
    try {

        const category = await categoryService.deleteCategory({ accountId, params });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleCategoryDeletion for account: ${accountId} - Error: ${error}`);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleGetCategoryById,
    handleGetAllCategories,
    handleCategoryCreation,
    handleCategoryUpdation,
    handleCategoryDeletion
}