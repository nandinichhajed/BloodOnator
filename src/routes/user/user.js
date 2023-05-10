const router = require("express").Router();

// User Controller
const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  updateUserPreMedicalHistory,
} = require("../../controllers/user/user");

// User middleware
const { isLoggedIn } = require("../../middlewares/user");

// * User route

router.route("/profile").get(isLoggedIn, getUserProfile);
router.route("/profile/update").patch(isLoggedIn, updateUserProfile);
router.route("/profile/password/update").patch(isLoggedIn, updateUserPassword);
router
  .route("/profile/pre-medical-history/update")
  .patch(isLoggedIn, updateUserPreMedicalHistory);

module.exports = router;
