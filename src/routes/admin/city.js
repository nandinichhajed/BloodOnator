const router = require("express").Router();

// City Admin Controller
const {
  createCity,
  getCities,
  getCity,
  updateCityManager,
  getCityDetailsByCityName,
} = require("../../controllers/admin/city");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * Admin, route

// Create City
router.route("/").post(isLoggedIn, customRole("admin"), createCity);

// Get all cities
router.route("/").get(isLoggedIn, customRole("admin"), getCities);

// Get single city by city name
router
  .route("/search/:city")
  .get(isLoggedIn, customRole("admin"), getCityDetailsByCityName);

// Get single city by ID and update
router
  .route("/:id")
  .get(isLoggedIn, customRole("admin"), getCity)
  .patch(isLoggedIn, customRole("admin"), updateCityManager);

module.exports = router;
