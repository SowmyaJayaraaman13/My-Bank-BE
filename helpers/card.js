const { dbConnection } = require('../database/index');

const { conditionsHandler } = require('./index');

// const { data, error } = await dbConnection.from('Card').select('*').filter('id', 'in', `(${ids})`);

// let idConditions = ids.map(id => `id.eq.${id}`).join(',');
// queryBuilder = queryBuilder.or(idConditions);

const queryAllCardsOrByIds = async ({ accountId, conditions = {} }) => {
    try {
        let queryBuilder = dbConnection.from('Card').select();

        if (Object.keys(conditions)?.length) {
            queryBuilder = conditionsHandler({ queryBuilder, conditions });
        }
    
        const { data, error } = await queryBuilder.select('*');
    
        if (error) {
            throw new Error(`Error:${JSON.stringify(error)}`);
        }
    
        return data;
    } catch(error) {
        console.log(`Error in queryAllCardsOrByIds for account: ${accountId}`, error);
        throw error;
    }

};


module.exports = {
    queryAllCardsOrByIds
};