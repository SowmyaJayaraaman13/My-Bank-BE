

const { dbConnection } = require('../../database/index');

const { queryAllTransactionsOrByIds, transactionHandler } = require('../../helpers/transaction');


const getTransactionById = async ({ accountId, userId, params }) => {
    const { transactionId } = params;
    try {
        const conditions = {
            user_id: { eq: userId },
            account_id: { eq: accountId },
            id: { in: [transactionId] },
        };
        const transaction = await queryAllTransactionsOrByIds({ accountId, conditions });
        return transaction;

    } catch (error) {
        console.log(`Error in getting transaction with Id: ${transactionId}`);
        throw error;
    }
};

const getAllTransactions = async ({ accountId, userId }) => {
    try {
        const conditions = {
            account_id: { eq: accountId },
            user_id: { eq: userId },
        };
        const transactions = await queryAllCategoriesOrByIds({ accountId, conditions });
        return transactions;
    } catch (error) {
        console.log(`Error in getting all the transactions: ${JSON.stringify(error)}`);
        throw error;
    }
};

const createTransaction = async ({ accountId, userId, body }) => {
    const { purpose, description, amount, date, mode, card, category, type } = body
    try {
        let currentBalance;
        let resultData = {};
        if (type === 'EXPENSE') {
            if (card?.balance > amount) {
                currentBalance = card?.balance - amount;

            } else {
                throw Error('You dont have sufficient balance to proceed');
            }
            resultData = await transactionHandler({ accountId, userId, purpose, description, amount, date, mode, card, category, type, currentBalance });
        } else {
            currentBalance = card?.balance + amount;
            resultData = await transactionHandler({ accountId, userId, purpose, description, amount, date, mode, card, category, type, currentBalance });
        }

        return resultData;

    } catch (error) {
        console.log("Error in creating transaction", error);
        throw error;
    }
};

const updateTransaction = async ({ accountId, body, transactionId }) => {
    const {  } = body;
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