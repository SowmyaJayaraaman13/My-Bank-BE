

const { dbConnection } = require('../../database/index');

const { capitalizeFirstLetter, queryAllCategoriesOrByIds } = require('../../helpers/category');


const getCategoryById = async ({ accountId, userId, params }) => {
    const { categoryId } = params;
    try {

        const conditions = {
            user_id: { eq: userId },
            account_id: { eq: accountId },
            id: { in: [categoryId] },
        };
        const category = await queryAllCategoriesOrByIds({ accountId, conditions });
        return category;

    } catch (error) {
        console.log(`Error in getting category with Id: ${categoryId}`);
        throw error;
    }
};

const getAllCategories = async ({ accountId, userId }) => {
    try {
        const conditions = {
            account_id: { eq: accountId },
            user_id: { eq: userId },
        };
        const categories = await queryAllCategoriesOrByIds({ accountId, conditions });
        return categories;

    } catch (error) {
        console.log(`Error in getting categories: ${JSON.stringify(error)}`);
        throw error;
    }
};

const createCategory = async ({ accountId, userId, body }) => {
    const { label, icon, description } = body
    try {

        const categoryPayload = {
          name: label.toUpperCase(),
          label: capitalizeFirstLetter(label),
          icon,
          account_id: accountId,
          user_id: userId,
          description: description || '',
        };

        const { data, error } = await dbConnection.from('Category').insert(categoryPayload).select();

        if (error) {
            throw new Error(`Error:${JSON.stringify(error.message)}`);
        }

        return data;

    } catch (error) {
        console.log("Error in creating category", error);
        throw error;
    }
};

const updateCategory = async ({ accountId, body, categoryId }) => {
    const { label, icon } = body;
    try {

        const updatedData = {
            ...( label?.length && { label: capitalizeFirstLetter(label), name: label.toUpperCase() }),
            ...( icon?.length && { icon }),
        };

        let { data, error } = await dbConnection.from('Category').update(updatedData).eq('id', categoryId).select();

        if (error) {
            throw new Error(`Error:${JSON.stringify(error.message)}`);
        }

        return data;

    } catch (error) {
        console.log(`Error in updating category with Id: ${categoryId} for account: ${accountId}`);
        throw error;
    }
};

const deleteCategory = async ({ accountId, params }) => {
    const { categoryId } = params;
    try {

        let { data, error } = await dbConnection.from('Category').delete().eq('id', categoryId).select();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in deleting category with Id: ${categoryId} for account: ${accountId}`);
        throw error;
    }
};


module.exports = {
    getCategoryById,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}