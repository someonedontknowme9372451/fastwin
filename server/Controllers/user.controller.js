const  User  = require('../Model/user.model');
const userService = require('../Services/user.service');
const bcrypt = require('bcrypt');

const createUserController = async (req, res) => {
  try {
    const { mobile, password, inviteCode } = req.body;
    
    if (!mobile || !password || !inviteCode) {
      return res.status(422).json({ error: 'Unprocessable Entity - Missing required fields' });
    }

    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const data = await userService.createUser(mobile, password, inviteCode);

    if (!data) {
      return res.status(500).json({ error: 'Server error', data: null, success: false });
    }

    return res.status(201).json({ message: 'User signed up successfully', data, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

const findUserController = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Check if the user exists
    const user = await userService.findUser({ mobile });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password or mobile' });
    }

    // If user and password are valid, generate a token
    const token = userService.createToken(user);

    if (!token) {
      return res.status(500).json({ error: 'Token not generated', success: false });
    }
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    });
    res.cookie('id',user.id, {
      withCredentials: true,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    });
    res.cookie('mobile',user.mobile, {
      withCredentials: true,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    });
    res.cookie('name',user.name, {
      withCredentials: true,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    });
    res.cookie('invite',user.inviteCode, {
      withCredentials: true,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    });

    return res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      data: user,
      token:token
    });
  } catch (err) {
    return res.status(500).json({ error: `Error authenticating user: ${err.message}`, success: false });
  }
};

module.exports = { createUserController, findUserController };
