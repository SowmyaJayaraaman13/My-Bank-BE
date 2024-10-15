

const { dbConnection } = require('../../database/index');

const { generateRandomSecret, generateJwtToken } = require('../../helpers/account');


const getAccountById = async ({ params }) => {
  const { accountId } = params;
  try {

    let { data, error } = await dbConnection.from('Account').select('*').eq('id', accountId);

    if (error) {
      throw error;
    }

    return data;

  } catch (error) {
    console.log(`Error in getting account with Id: ${accountId}`);
    // res.status(400).json({ error:  error.message });
    throw error;
  }
};

const getAllAccounts = async () => {
  try {

    let { data, error } = await dbConnection.from('Account').select('*');

    if (error) {
      throw error
    }

    return data;

  } catch (error) {
    console.log(`Error in getting accounts: ${JSON.stringify(error)}`);
    // res.status(400).json({ error:  error.message });
    throw error;
  }
};

const signup = async ({ body }) => {
  const { name, password, email } = body
  try {

    const secret = generateRandomSecret();

    const accountPayload = {
      name,
    }

    const userPayload = {
      name,
      password,
      email,
      secret,
      is_admin: true,
    };

    let result;

    const { data: accountData, error: accountError } = await dbConnection.from('Account').insert(accountPayload).select();

    const { data: userData, error: userError } = await dbConnection.from('User').insert(userPayload).select();

    if (accountError || userError) {
      const error = accountError || userError;
      throw new Error(`Error:${JSON.stringify(error.message)}`);
    }

    result = { ...result, accountData, userData };
    return result;

  } catch (error) {
    console.log("Error in creating account and user while signing up", error);
    throw error;
  }
};



const login = async ({ body }) => {
  const { email, password } = body

  try {

    let resultData = {};

    if (email == undefined || password == undefined) {
      throw new Error(`Error:Email and password is mandatory`);
    }

    let { data: users, error } = await dbConnection.from('User').select('*');

    if (error) {
      throw new Error(`Error:${JSON.stringify(error.message)}`);
    }

    let userData = users.find(user => user.email === email);

    if (email === userData.email && password === userData.password) {

      let jwtResult = generateJwtToken(userData);

      resultData.token = `Bearer ${jwtResult.JwtToken}`;
      // resultData.expirationDate = `${jwtResult.ExpirationDate.toLocaleDateString()} ${jwtResult.ExpirationDate.toLocaleTimeString()}`;
      resultData.data = userData;

    } else {
      throw new Error(`Error: Email/password does not match!!`);
    }

    return resultData;

  } catch (error) {
    console.log(`Error while logging-in`);
    throw error;
  }
};

module.exports = {
  getAccountById,
  getAllAccounts,
  signup,
  login
}