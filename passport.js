const { Strategy, ExtractJwt } = require('passport-jwt');

const { dbConnection } = require('./database');


const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {

        console.log("payload---->", payload);

        // let user = { 
        //     id: "1a-2b-3c-4d-5e-6f", 
        //     email: "mukarram@gmail.com", 
        //     password: "123456789", role: 'admin' 
        // };/

        let { data, error } = await dbConnection.from('User').select('*');

        if (error) {
          throw { status: 404, message: `Error:${error}` }
        }

        let user = data.filter(item => item.email === payload.email);

        if(user?.length){
            user = user
        } else {
            user = {};
        }

        user = user.email === payload.email ? user : {}

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