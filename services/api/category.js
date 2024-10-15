

const { dbConnection } = require('../../database/index');

const { generateRandomSecret, generateJwtToken } = require('../../helpers/account');


const getCategoryById = async ({ params }) => {
    const { categoryId } = params;
    try {

        let { data, error } = await dbConnection.from('Category').select('*').eq('id', categoryId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in getting category with Id: ${categoryId}`);
        throw error;
    }
};

const getAllCategories = async () => {
    try {

        let { data, error } = await dbConnection.from('Category').select('*');

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in getting categories: ${JSON.stringify(error)}`);
        throw error;
    }
};

const createCategory = async ({ body }) => {
    const { label, icon } = body
    try {

        const categoryPayload = {
          name: label.toUpperCase(),
          label,
          icon
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

const updateCategory = async ({ params }) => {
    const { categoryId } = params;
    try {

        const updatedData = {

        };

        let { data, error } = await dbConnection.from('Category').update(updatedData).eq('id', categoryId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in updating category with Id: ${categoryId}`);
        throw error;
    }
};

const deleteCategory = async ({ params }) => {
    const { categoryId } = params;
    try {

        let { data, error } = await dbConnection.from('Category').delete().eq('id', categoryId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in deleting category with Id: ${categoryId}`);
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