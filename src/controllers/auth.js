// Model
const User = require("../models/user");
const preMedicalHistory = require("../models/preMedicalHistory");

// Utils
const customError = require("../utils/customError");

// Registering a new user
exports.register = async (req, res) => {
  // Checking all the fields are present
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return customError(res, 400, "Name, email and password are required");
  }

  try {
    // Checking user already exist or not
    const isUserExit = await User.findOne({ email });
    if (isUserExit !== null) {
      return customError(res, 401, "User already exists, please login");
    }

    // Creating new user and preMedicalHistory
    const preMedicalHistoryUser = await preMedicalHistory.create({
      ...req.body,
    });
    const preMedicalHistoryUserID = preMedicalHistoryUser._id;
    await User.create({
      preMedicalHistory: preMedicalHistoryUserID,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Logging a user - sign in
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Checking all the fields are present
  if (!email || !password) {
    return customError(res, 400, "Email and password are required");
  }

  try {
    const user = await User.findOne({ email });

    // Checking is valid email
    if (!user) {
      return customError(res, 401, "Either email or password is incorrect");
    }

    // Checking is valid password
    const isPasswordMatch = await user.isValidPassword(password);
    if (!isPasswordMatch) {
      return customError(res, 401, "Either email or password is incorrect");
    }

    // Valid user, creating jwt token valid for 2days
    const token = await user.getJwtLoginToken();

    // Sending a cookie valid for 2days
    res.cookie("token", token, {
      expire: new Date(
        Date.now() * process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    // Sending response
    res.status(200).json({
      status: "success",
      token,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Logged in user can logout
exports.logout = async (req, res) => {
  try {
    // Removing token from tokens array
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    // Saving to Database
    await req.user.save();

    // Clearing cookies
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Sending response
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Logged in user can logout all instances
exports.logoutAll = async (req, res) => {
  try {
    // Removing tokens
    req.user.tokens = [];

    // Saving to Database
    await req.user.save();

    // Clearing cookies
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Sending response
    res.status(200).json({
      status: "success",
      message: "User logged out of all instances successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
