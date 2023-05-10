// Model
const User = require("../models/user");
const PreMedicalHistory = require("../models/preMedicalHistory");

// Library
const jwt = require("jsonwebtoken");

// Utils
const customError = require("../utils/customError");

// Middleware to check is user logged in or not
exports.isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.body.token;

    // If token is not present
    if (!token) {
      if (req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
      } else {
        return customError(res, 400, "Token not found, please authenticate");
      }
    }

    // Verifying token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Finding user based on token
    const user = await User.findById(decodedToken.id);

    // If no user found with the entered token
    if (!user) {
      return customError(
        res,
        401,
        "Either token expired or invalid, please authenticate"
      );
    }

    // Checking the token is present in tokens array of the user
    const isTokenPresentInTokensArray = user.tokens.find(
      (t) => t.token === token
    );

    if (!isTokenPresentInTokensArray) {
      return customError(
        res,
        401,
        "Either token expired or invalid, please authenticate"
      );
    }

    const preMedicalHistoryUser = await PreMedicalHistory.findById(
      user.preMedicalHistory
    );

    req.user = user;
    req.token = token;
    req.preMedicalHistory = preMedicalHistoryUser;
    next();
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Middleware to check is user a admin or manager
exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return customError(res, 401, "You are not allowed to use this");
    }
    next();
  };
};
