const router = require("express").Router();

// User Controller
const {
  createAppointment,
  getUserDonationAppointments,
  getUserDonationAppointmentById,
  updateUserDonationAppointmentAsCancelled,
  getUserRequestAppointments,
  getUserRequestAppointmentById,
  updateUserRequestAppointmentAsCancelled,
} = require("../../controllers/user/appointment");

// User middleware
const { isLoggedIn } = require("../../middlewares/user");

// * User route

// Create appointment
router.route("/").post(isLoggedIn, createAppointment);

// * Donation Appointment
// Get donation appointments of logged in user
router.route("/donations").get(isLoggedIn, getUserDonationAppointments);

// Get single donation appointment of logged in user by id
router
  .route("/donations/:id")
  .get(isLoggedIn, getUserDonationAppointmentById)
  .patch(isLoggedIn, updateUserDonationAppointmentAsCancelled);

// * Request Appointment
// Get request appointments of logged in user
router.route("/requests").get(isLoggedIn, getUserRequestAppointments);

// Get single request appointment of logged in user by id
router
  .route("/requests/:id")
  .get(isLoggedIn, getUserRequestAppointmentById)
  .patch(isLoggedIn, updateUserRequestAppointmentAsCancelled);

module.exports = router;
