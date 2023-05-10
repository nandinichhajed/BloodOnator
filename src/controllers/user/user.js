// Model
const User = require("../../models/user");
const PreMedicalHistory = require("../../models/preMedicalHistory");

// Utils
const customError = require("../../utils/customError");

// * Role -> User
// Getting user profile
exports.getUserProfile = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: req.user,
      preMedicalHistory: req.preMedicalHistory,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// updating user profile not password and image
exports.updateUserProfile = async (req, res) => {
  try {
    // updating user profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      status: "success",
      message: "User profile updated",
      user,
      preMedicalHistory: req.preMedicalHistory,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// updating user profile not password and image
exports.updateUserPreMedicalHistory = async (req, res) => {
  try {
    // updating user PreMedicalHistory
    const preMedicalHistoryUser = await PreMedicalHistory.findByIdAndUpdate(
      req.preMedicalHistory._id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      status: "success",
      message: "User Pre Medical History updated",
      user: req.user,
      preMedicalHistoryUser,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// updating user password
exports.updateUserPassword = async (req, res) => {
  try {
    // Destructuring
    const { oldPassword, newPassword } = req.body;

    // Checking all the fields are present
    if (!oldPassword || !newPassword) {
      return customError(res, 400, "oldPassword and newPassword are required");
    }

    // Checking is old Password is correct
    const isCorrectPassword = await req.user.isValidPassword(oldPassword);

    // If oldPassword is incorrect
    if (!isCorrectPassword) {
      return customError(res, 401, "Password is incorrect or invalid");
    }

    // updating new password
    req.user.password = newPassword;
    await req.user.save();

    res.json({
      status: "success",
      message: "Updated user's password",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
