const express = require('express')
const router = express.Router()
const { dbConnection } = require('../database');

router.get('/login', async (req, res) => {
  try {

    let { email, password } = req.body;

    let resultData = {};

    if (email == undefined || password == undefined) {
      throw { status: 404, message: `Error:Email and password is mandatory` }
    }

    let users;

    app.get('/users', async (req, res) => {
      let { data, error } = await dbConnection.from('Users').select('*');
      if (error) {
        throw { status: 404, message: `Error:${error}` }
      }
      users = data;
    });


    let userData = users.find(user => user.email === email);

    if (email === userData.email && password === userData.password) {

      let jwtResult = generateJwtToken(userData);

      resultData.token = `Bearer ${jwtResult.JwtToken}`;
      resultData.expirationDate = `${jwtResult.ExpirationDate.toLocaleDateString()} ${jwtResult.ExpirationDate.toLocaleTimeString()}`;
      resultData.data = userData;

    } else {
      throw { status: 404, message: 'Error: Email/password do not match!!' }
    }

    res.status(200).json(resultData);

  } catch (error) {
    console.log("Error in logging-in", error);
    res.status(error.status || 404).json(error.message || error);
  }
});


const generateJwtToken = (userData) => {
  try {

    let today = new Date();
    let expirationDate = new Date(today);
    expirationDate.setMinutes(today.getMinutes() + 30)

    let payload = {
      id: userData.id,
      email: userData.email,
      iat: parseInt(today.getTime() / 1000, 10),
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }

    let secretKey = process.env.JWT_SECRET;
    let token = jwt.sign(payload, secretKey)
    return { JwtToken: token, ExpirationDate: expirationDate }

  } catch (error) {
    console.log("Error in generateJwtToken", error);
    throw error;
  }

}

module.exports = router