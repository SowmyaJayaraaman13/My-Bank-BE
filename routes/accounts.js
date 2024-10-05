const express = require('express')
const router = express.Router()
const { dbConnection } = require('../database');

router.get('/accounts', async (req, res) => {
  try {

    let { data, error } = await dbConnection.from('Account').select('*');
    if (error) {
      throw { status: 404, message: `Error:${error}` }
    }
    res.send(data);
  } catch (error) {
    console.log("Error in getting accounts", error);
    res.status(error.status).json(error.message)
  }
});


router.get('/accountById', async (req, res) => {
  const { accountId } = req.params;
  try {
    let { data, error } = await dbConnection.from('Account').select('*').eq('id', accountId);
    if (error) {
      throw { status: 404, message: `Error:${error}` }
    }
    res.send(data);
  } catch (error) {
    console.log(`Error in getting account with id: ${accountId}`, error);
    res.status(error.status).json(error.message)
  }
});


router.post('/signup', async (req, res) => {
  try {

      const accountPayload = {
          name: req.body.name,
      }

      const userPayload = {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          is_admin: true,
      };

      let result;

      const { data: accountData, error: accountError } = await dbConnection.from('Account').insert(accountPayload).select()

      const { data: userData, error: userError } = await dbConnection.from('User').insert(userPayload).select()

      if (accountError || userError) {
          const error = accountError || userError;
          throw { status: 201, message: `Error:${JSON.stringify(error.message)}` }
      }

      result = { ...result, accountData, userData };
      res.send(result);
  } catch (error) {
      console.log("Error in creating account and user", error);
      res.status(error.status).json(error.message)
  }
});


module.exports = router