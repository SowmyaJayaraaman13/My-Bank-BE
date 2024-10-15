const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.get('/category/:categoryId', categoryController.handleGetCategoryById);
router.get('/categories', categoryController.handleGetAllCategories);
router.post('/category', categoryController.handleCategoryCreation);
router.put('/category/:categoryId', categoryController.handleCategoryUpdation);
router.delete('/category/:categoryId', categoryController.handleCategoryDeletion);


module.exports = router