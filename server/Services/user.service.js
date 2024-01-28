const jwt =  require('jsonwebtoken');
const { User } = require('../Model/user.model');

async function createUser(mobile, password, inviteCode) {
  try {
    if (!mobile || !password || !inviteCode) {
      throw new Error('Mobile, password, and inviteCode are required.');
    }

    const nextId = await getNextId();
    const newData = new User({ mobile, password, inviteCode, balance: 0, id: nextId, name: 'IND' });
    await newData.save();

    return newData;
  } catch (error) {
    console.error('Error saving user data:', error.message);
    throw error;
  }
}

async function getNextId() {
  try {
    const lastUser = await User.findOne().sort({ _id: -1 });
    return lastUser ? parseInt(lastUser.id,10) + 1 : 11111;
  } catch (error) {
    console.error('Error getting next ID:', error.message);
    throw error;
  }
}

async function findUser(mobile) {
  try {
    const mobileValue = typeof mobile === 'object' ? mobile.mobile : mobile;
    const user = await User.findOne({ mobile: mobileValue });

    if (!user) {
      console.log(`User with mobile number ${mobileValue} not found.`);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error finding user:', error.message);
    throw error;
  }
}

function createToken(user) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not configured');
    }

  
    return jwt.sign({user},
      process.env.JWT_SECRET, // Use your JWT secret stored in environment variables
      { expiresIn: '1h' } // Set token expiration time
    );
  } catch (error) {
    console.error('Error creating JWT token:', error.message);
    throw error;
  }
}

module.exports = { createUser, findUser, createToken };
