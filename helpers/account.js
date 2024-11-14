
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const { dbConnection } = require('../database/index')

const generateRandomSecret = () => {
    try {

        const secret = uuid.v4();
        return secret;

    } catch (error) {
        console.log("Error in generateRandomSecret", error);
        throw error;
    }
}


const getUserSecret = async (jwtPayload, done) => {
    try {

        const decodedToken = jwt.decode(jwtPayload, { complete: true });
        const payload = decodedToken.payload;
  
        let { data, error } = await dbConnection.from('User').select('secret').eq('id', payload.id);

        if (error) {
            return done(error, false);
        }

        if (data?.length === 0) {
            return done(null, false, { message: 'User not found' });
        }

        const secret = data[0].secret;
        return done(null, secret);

    } catch (error) {
        return done(error, false);
    }
}

const generateJwtToken = (userData) => {
    try {

        let today = new Date();
        let expirationDate = new Date(today);
        expirationDate.setMinutes(today.getMinutes() + 30)

        let payload = {
            id: userData.id,
            email: userData.email,
            // iat: parseInt(today.getTime() / 1000, 10),
            // exp: parseInt(expirationDate.getTime() / 1000, 10),
        }

          let secretKey = userData.secret;   // secret: '29c53df3-fa7a-402b-be6a-a8b66bf63fdc'
        // let secretKey = process.env.JWT_SECRET;
        let token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        console.log("token--->", token);
        return { JwtToken: token, 
            // ExpirationDate: expirationDate 
        }

    } catch (error) {
        console.log("Error in generateJwtToken", error);
        throw error;
    }

}


module.exports = {
    generateRandomSecret,
    generateJwtToken,
    getUserSecret,
};