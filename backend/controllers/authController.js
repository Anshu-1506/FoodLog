const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const {
  OAuth2Client
} = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
    const existing = await User.findOne({
      email: email.toLowerCase()
    });
    if (existing) return res.status(400).json({
      message: 'Email already registered'
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dailyGoals: user.dailyGoals,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await User.findOne({
      email: email?.toLowerCase()
    });
    if (!user) return res.status(401).json({
      message: 'Invalid credentials'
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({
      message: 'Invalid credentials'
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dailyGoals: user.dailyGoals,
      streak: user.streak,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};
const getMe = async (req, res) => {
  res.json(req.user);
};
module.exports = {
  signup,
  login,
  getMe
};
const googleAuth = async (req, res, next) => {
  try {
    const {
      credential
    } = req.body;
    if (!credential) return res.status(400).json({
      message: 'Missing Google credential'
    });
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const {
      sub: googleId,
      email,
      name
    } = payload;
    let user = await User.findOne({
      $or: [{
        googleId
      }, {
        email: email.toLowerCase()
      }]
    });
    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        googleId
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dailyGoals: user.dailyGoals,
      streak: user.streak,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signup,
  login,
  getMe,
  googleAuth
};