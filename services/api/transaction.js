

const { dbConnection } = require('../../database/index');

const { generateRandomSecret, generateJwtToken } = require('../../helpers/account');


const getTransactionById = async ({ params }) => {
    const { transactionId } = params;
    try {

        let { data, error } = await dbConnection.from('Transaction').select('*').eq('id', transactionId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in getting transaction with Id: ${transactionId}`);
        throw error;
    }
};

const getAllTransactions = async () => {
    try {

        let { data, error } = await dbConnection.from('Transaction').select('*');

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in getting all the transactions: ${JSON.stringify(error)}`);
        throw error;
    }
};

const createTransaction = async ({ body }) => {
    const { purpose, description, category, amount, date, mode, card } = body
    try {

        const transactionPayload = {
            purpose,
            description,
            category_id: category.value,
            amount,
            date,
            mode_of_payment: mode,
            card_id: card.value,
        };

        const { data, error } = await dbConnection.from('Transaction').insert(transactionPayload).select();

        if (error) {
            throw new Error(`Error:${JSON.stringify(error.message)}`);
        }

        return data;

    } catch (error) {
        console.log("Error in creating transaction", error);
        throw error;
    }
};

const updateTransaction = async ({ params }) => {
    const { transactionId } = params;
    try {

        const updatedData = {

        };

        let { data, error } = await dbConnection.from('Transaction').update(updatedData).eq('id', transactionId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in updating transaction with Id: ${transactionId}`);
        throw error;
    }
};

const deleteTransaction = async ({ params }) => {
    const { transactionId } = params;
    try {

        let { data, error } = await dbConnection.from('Transaction').delete().eq('id', transactionId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.log(`Error in deleting transaction with Id: ${transactionId}`);
        throw error;
    }
};


module.exports = {
    getTransactionById,
    getAllTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
}