const router = require("express").Router();

// User Controller
const {
  getAllDonationsOfLoggedInUser,
  getSingleUserDonation,
} = require("../../controllers/user/donation");

// User middleware
const { isLoggedIn } = require("../../middlewares/user");

// * User route

router.route("/").get(isLoggedIn, getAllDonationsOfLoggedInUser);

router.route("/:id").get(isLoggedIn, getSingleUserDonation);

module.exports = router;
