const router = require("express").Router();

// User Controller
const {
  getCities,
  getCityDetailsByCityName,
} = require("../../controllers/user/city");

// User middleware
const { isLoggedIn } = require("../../middlewares/user");

// * User route

router.route("/").get(isLoggedIn, getCities);
router.route("/:city").get(isLoggedIn, getCityDetailsByCityName);

module.exports = router;
