const { Strategy, ExtractJwt } = require('passport-jwt');

const { dbConnection } = require('./database/index');


const { getUserSecret } = require('./helpers/account');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKeyProvider: async (req, jwtPayload, done) => await getUserSecret(jwtPayload, done),
};

const jwtVerify = async (jwtPayload, done) => {    // id, email, iat, exp
    try {

        let { data: user, error } = await dbConnection.from('User').select('*, Account: account_id(*)').eq('id', jwtPayload.id);

        if (error) {
            throw new Error(`Error:${JSON.stringify(error.message)}`);
        }

        const userData = user?.length ? user[0] : user;
        console.log("userData--->", userData);

        let resultData = {};

        if (jwtPayload.email === userData.email) {
            console.log("Inside----")
            resultData.account = userData.Account;
            Object.keys(resultData?.account).includes('id') && delete userData?.Account;
            delete userData.secret;
            resultData.user = userData;
        }

        console.log("resultData--->", resultData);
        if (!resultData) {
            return done(null, false);
        }


        done(null, resultData);

    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy
}