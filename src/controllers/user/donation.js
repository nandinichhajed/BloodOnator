// Model
const Donation = require("../../models/donation");

// Utils
const customError = require("../../utils/customError");

// * Role -> User

// Get all user donations
exports.getAllDonationsOfLoggedInUser = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id });

    // Response
    res.json({
      status: "success",
      results: donations.length,
      donations,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get single user donation
exports.getSingleUserDonation = async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    // If donation not found
    if (!donation) {
      return customError(res, 404, "Donation not found", "error");
    }

    // Response
    res.json({
      status: "success",
      donation,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
