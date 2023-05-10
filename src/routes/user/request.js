const router = require("express").Router();

// User Controller
const {
  createReceiver,
  getAllUserReceivedBlood,
  getSingleUserReceivedBloodDetails,
} = require("../../controllers/user/request");

// User middleware
const { isLoggedIn } = require("../../middlewares/user");

// * User route

router.route("/").post(isLoggedIn, createReceiver);
router.route("/").get(isLoggedIn, getAllUserReceivedBlood);

router.route("/:id").get(isLoggedIn, getSingleUserReceivedBloodDetails);

module.exports = router;
