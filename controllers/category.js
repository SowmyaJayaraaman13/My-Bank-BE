
const categoryService = require('../services/api/category');


const handleGetCategoryById = async (req, res) => {
    const { params } = req;
    try {

        const category = await categoryService.getCategoryById({ params });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleGetCategoryById: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleGetAllCategories = async (req, res) => {
    try {

        const categories = await categoryService.getAllCategories();
        res.status(201).json(categories);

    } catch (error) {
        console.log(`Error in handleGetAllCategories: ${error}`);
        res.status(400).json({ error: error.message });
    }
}

const handleCategoryCreation = async (req, res) => {
    const { body } = req;
    try {

        const category = await categoryService.createCategory({ body });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleCategoryCreation: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCategoryUpdation = async (req, res) => {
    const { body } = req;
    try {

        const category = await categoryService.updateCategory({ body });
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleCategoryUpdation: ${error}`);
        res.status(400).json({ error: error.message });
    }
}


const handleCategoryDeletion = async (req, res) => {
    try {

        const category = await categoryService.deleteCategory();
        res.status(201).json(category);

    } catch (error) {
        console.log(`Error in handleCategoryDeletion: ${error}`);
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