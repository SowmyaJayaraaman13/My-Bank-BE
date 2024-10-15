const { Strategy, ExtractJwt } = require('passport-jwt');

const { dbConnection } = require('./database/index');


const { getUserSecret } = require('./helpers/account');

const jwtOptions = {
    // secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKeyProvider: async (req, jwtPayload, done) => await getUserSecret(jwtPayload, done),
};

const jwtVerify = async (jwtPayload, done) => {    // id, email, iat, exp
    try {  

        let { data: user, error } = await dbConnection.from('User').select('*').eq('id', jwtPayload.id);

        if (error) {
          throw new Error(`Error:${error}`);
        }

        user = user.email === jwtPayload.email ? user : {}

        if (!user) {
            return done(null, false);
        }

        done(null, user);

    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy
}