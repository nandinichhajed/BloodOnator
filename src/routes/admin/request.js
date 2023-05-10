const router = require("express").Router();

// Received Admin Controller
const {
  getAllBloodReceived,
  getAllBloodReceivedByCity,
  getAllBloodReceivedByCityMonthAndYear,
  getSingleBloodReceived,
} = require("../../controllers/admin/received");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * Admin, route

// Get all blood received
router.route("/").get(isLoggedIn, customRole("admin"), getAllBloodReceived);

// Get all blood received by city
router
  .route("/city/:city")
  .get(isLoggedIn, customRole("admin"), getAllBloodReceivedByCity);

// Get all blood received by city and month
router
  .route("/city-month-year/:city/:month/:year")
  .get(isLoggedIn, customRole("admin"), getAllBloodReceivedByCityMonthAndYear);

// Get single blood receive details
router
  .route("/:id")
  .get(isLoggedIn, customRole("admin"), getSingleBloodReceived);

module.exports = router;
