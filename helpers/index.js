




const conditionsHandler = ({ queryBuilder, conditions }) => {
    try {
        Object.keys(conditions).forEach(key => {
            const condition = conditions[key];

            if (condition !== undefined) {
                // Check for specific condition types
                if (typeof condition === 'object') {
                    if (condition.in !== undefined) {
                        queryBuilder = queryBuilder.in(key, condition.in);
                    }
                    if (condition.eq !== undefined) {
                        queryBuilder = queryBuilder.eq(key, condition.eq);
                    }
                    if (condition.gt !== undefined) {
                        queryBuilder = queryBuilder.gt(key, condition.gt);
                    }
                    if (condition.lt !== undefined) {
                        queryBuilder = queryBuilder.lt(key, condition.lt);
                    }
                } else {
                    // Fallback to equality if a simple value is provided
                    queryBuilder = queryBuilder.eq(key, condition);
                }
            }
        });

        return queryBuilder;
    } catch (error) {
        console.log(`Error in conditionsHandler: ${JSON.stringify(error)}`);
        throw error;
    }
};

const databaseErrorHandler = ({ error }) => {
    throw new Error(`Error:${JSON.stringify(error.message)}`);
};

module.exports = {
    conditionsHandler,
    databaseErrorHandler
};