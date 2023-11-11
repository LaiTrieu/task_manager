const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateRegistration,
  validateLogin,
  validate,
} = require("../utils/validation");

const registerUser = async (req, res) => {
  try {
    const validationRules = validateRegistration();

    validate(req, res, async () => {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      const user = new User(req.body);
      await user.save();
      res.send({
        success: true,
        message: "User registered successfully",
      });
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const validationRules = validateLogin();

    validate(req, res, async () => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("User does not exist");
      }

      const passwordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCorrect) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
        expiresIn: "1d",
      });

      res.send({
        success: true,
        data: token,
        message: "User logged in successfully",
      });
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    res.send({
      success: true,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser,
};
