

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

    let result;
    let userPayload;

    const { data: accountData, error: accountError } = await dbConnection.from('Account').insert(accountPayload).select();

    if (accountData?.length) {
      userPayload = {
        name,
        password,
        email,
        secret,
        is_admin: true,
        account_id: accountData[0]?.id,
      };
    }


    const { data: userData, error: userError } = await dbConnection.from('User').insert(userPayload).select();

    if (accountError || userError) {
      const error = accountError || userError;
      throw new Error(`Error:${JSON.stringify(error.message)}`);
    }

    // result = { ...result, accountData, userData };
    return { success: true };
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

    let { data: user, error } = await dbConnection.from('User').select('*, Account: account_id(*)').eq('email', email);

    if (error) {
      throw new Error(`Error:${JSON.stringify(error.message)}`);
    }

    const userData = user?.length ? user[0] : user;

    if (password === userData.password) {

      let jwtResult = generateJwtToken(userData);

      resultData.token = `Bearer ${jwtResult.JwtToken}`;
      // resultData.expirationDate = `${jwtResult.ExpirationDate.toLocaleDateString()} ${jwtResult.ExpirationDate.toLocaleTimeString()}`;
      resultData.account = userData?.Account;
      Object.keys(resultData?.account).includes('id') && delete userData?.Account;
      delete userData.secret;
      resultData.user = userData;

    } else {
      throw new Error(`Error: Email/password does not match!!`);
    }

    return resultData;

  } catch (error) {
    console.log(`Error while logging-in`);
    throw error;
  }
};

const setUserProfileUrl = async ({ accountId, userId, profileFile }) => {
  try {

    const { data: pathData, error: pathError } = await dbConnection.storage.from('fundFlow').upload(`public/userId_${profileFile}`, profileFile);

    if (pathError) {
      throw new Error(`Error while uploading user profile picture:${JSON.stringify(pathError.message)}`);
    }

    const imagePath = pathData?.path;

    console.log("imagePath---->", imagePath);

    const { data: urlData, error: urlError } = await dbConnection.storage.from('fundflow').getPublicUrl(imagePath);

    if (urlError) {
      throw new Error(`Error while getting user profile picture url:${JSON.stringify(urlError.message)}`);
    }

    const imagePublicUrl = urlData?.publicUrl;

    console.log("imagePublicUrl---->", imagePublicUrl);


    const updatedData = {
      profile_url: imagePublicUrl
    };

    let { data, error } = await dbConnection.from('User').update(updatedData).eq('id', userId).select();

    return data;

  } catch (error) {
    console.log(`Error in creating user profile url for user: ${userId}`, error);
    throw error;
  }
};

module.exports = {
  getAccountById,
  getAllAccounts,
  signup,
  login,
  setUserProfileUrl
}