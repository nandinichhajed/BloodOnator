const router = require("express").Router();

// Donation Admin Controller
const {
  getAllDonations,
  getSingleDonation,
  getAllDonationsByCity,
  getAllDonationsByCityMonthAndYear,
} = require("../../controllers/admin/donation");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * Admin, route

// Get all donations
router.route("/").get(isLoggedIn, customRole("admin"), getAllDonations);

// Get all donations by city
router
  .route("/cities/:city")
  .get(isLoggedIn, customRole("admin"), getAllDonationsByCity);

// Get all donations by city and month
router
  .route("/city-month-year/:city/:month/:year")
  .get(isLoggedIn, customRole("admin"), getAllDonationsByCityMonthAndYear);

// Get single donation
router.route("/:id").get(isLoggedIn, customRole("admin"), getSingleDonation);

module.exports = router;
