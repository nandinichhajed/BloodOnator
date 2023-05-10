const router = require("express").Router();

// Appointment Admin Controller
const {
  getAppointments,
  getDonationAppointments,
  getRequestAppointments,
  getAppointmentById,
} = require("../../controllers/admin/appointment");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * Admin, route

// Admin - get list of appointments
router.route("/").get(isLoggedIn, customRole("admin"), getAppointments);

// Admin - get list of donation appointments
router
  .route("/donations")
  .get(isLoggedIn, customRole("admin"), getDonationAppointments);

// Admin - get list of request appointments
router
  .route("/requests")
  .get(isLoggedIn, customRole("admin"), getRequestAppointments);

// Admin - get single appointment
router.route("/:id").get(isLoggedIn, customRole("admin"), getAppointmentById);

module.exports = router;
