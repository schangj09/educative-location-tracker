const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User.model');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const expiresIn = '1h'; // Token expiration time

exports.signup = async (req, res) => {
  try {
    const {
      username, password, gender
    } = req.body;

    // check if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // get avatar
    const avatar = "https://img.icons8.com/?size=160&id=492ILERveW8G&format=png"

    // create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      gender,
      profileBanner: avatar,
    });

    // save the user to the database
    await newUser.save();
    res.status(200).json({
      message: 'User created successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: null,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: 'User does not exist',
        data: null,
      });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid username or password',
        data: null,
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ user }, jwtSecretKey, {
      expiresIn,
    });
    res.status(200).json({
      message: 'Signin successful!',
      data: { token, user },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: null,
    });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id)
      .populate({
        path: "friends",
        select: "-password"
      })
      .select("-password");

    if (!currentUser) {
      return res.status(401).json({
        message: 'User does not exist',
        data: null,
      });
    }

    res.status(200).json({
      message: 'Authenticated',
      data: currentUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      data: null,
    });
  }
};