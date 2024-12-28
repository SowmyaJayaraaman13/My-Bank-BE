const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { mongoose } = require('../database/mongoDB');

const { dbConnection } = require('../database/index')
const { conditionsHandler, databaseErrorHandler } = require('./index');


const queryAllTransactionsOrByIds = async (ids, conditions) => {
    try {
        let queryBuilder = dbConnection.from('Transaction').select();

        if (Object.keys(conditions)?.length) {
            queryBuilder = conditionsHandler({ queryBuilder, conditions });
        }

        const { data, error } = await queryBuilder.select('*');

        if (error) {
            throw new Error(`Error:${JSON.stringify(error)}`);
        }

        return data;
    } catch (error) {
        console.log(`Error in queryAllTransactionsOrByIds for account: ${accountId}`, error);
        throw error;
    }
};

const transactionHandler = async ({ accountId, userId, purpose, description, amount, date, mode, card, categoryId, type, currentBalance }) => {
    try {

        const { data: cardData, error: cardError } = await dbConnection.from('Card').update({ balance: currentBalance }).eq('id', card?.id).select();

        if (cardError) databaseErrorHandler({ error: cardError });

        const transactionPayload = {
            purpose,
            description,
            category_id: categoryId,
            amount,
            date,
            mode_of_payment: mode,
            card_id: card?.id,
            type,
            account_id: accountId,
            user_id: userId,
        };

        const { data: transactionData, error: transactionError } = await dbConnection.from('Transaction').insert(transactionPayload).select();
        if (transactionError) databaseErrorHandler({ error: transactionError });

        return {
            cardData,
            transactionData
        };

    } catch (error) {
        console.log(`Error in transactionHandler: ${JSON.stringify(error)}`);
        throw error;
    }
}

const findTransaction = async({ transactionId, accountId, userId}) => {
    try {
        const { data, error } = await dbConnection.from('Transaction').select('*, card_id(*), category_id(*), user_id(*)').eq('id', transactionId).eq('account_id', accountId).eq('user_id', userId);
        if (error) databaseErrorHandler({ error: error });
        return data[0];
    } catch (error) {
        console.log(`Error in findTransaction: ${JSON.stringify(error)}`);
        throw error;
    }
}

const syncTransactionToMongoDB = async ({ transactionId, accountId, userId}) => {
    const mongoDB = mongoose.connection.db;
    const collection = mongoDB.collection('transactions');
    const transaction = await collection.findOne({ _id: transactionId });
    if (transaction) {
        await collection.updateOne({ _id: transactionId }, { $set: { accountId, userId } });
    } else {
        const { id, ...transactionData } = await findTransaction({ transactionId, accountId, userId });
        await collection.insertOne({ _id: id, ...transactionData });
    }
}


module.exports = {
    queryAllTransactionsOrByIds,
    transactionHandler,
    syncTransactionToMongoDB
};



// let { data: stores } = await supabase
//     .from('stores')
//     .select('*, cars!inner(*)')
//     .eq('cars.brand', 'Ford')
