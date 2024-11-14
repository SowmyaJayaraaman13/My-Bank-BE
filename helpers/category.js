
// const uuid = require('uuid');
// const jwt = require('jsonwebtoken');

const { dbConnection } = require('../database/index');

const { conditionsHandler } = require('./index');

const capitalizeFirstLetter = (string) => {
    try {

        return string.replace(/\b\w+/g, function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
    } catch (error) {
        console.log("Error in capitalizeFirstLetter", error);
        throw error;
    }
}


const queryAllCategoriesOrByIds = async ({ accountId, conditions = {} }) => {
    try {
        let queryBuilder = dbConnection.from('Category').select();

        if (Object.keys(conditions)?.length) {
            queryBuilder = conditionsHandler({ queryBuilder, conditions });
        }

        const { data, error } = await queryBuilder.select('*');

        if (error) {
            throw new Error(`Error:${JSON.stringify(error)}`);
        }

        return data;
    } catch (error) {
        console.log(`Error in queryAllCardsOrByIds for account: ${accountId}`, error);
        throw error;
    }

};

module.exports = {
    capitalizeFirstLetter,
    queryAllCategoriesOrByIds
};