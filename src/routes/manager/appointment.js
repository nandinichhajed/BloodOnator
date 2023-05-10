const router = require("express").Router();

// Manager Appointment Controller
const {
  getDonationAppointments,
  getDonationAppointmentDetails,
  updateAppointmentDonation,
  getRequestAppointments,
  getRequestAppointmentDetails,
  updateAppointmentRequest,
} = require("../../controllers/manager/appointment");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * DONATION
// Manager - Get list of donation appointment of his city
router
  .route("/donations")
  .get(isLoggedIn, customRole("manager"), getDonationAppointments);

// Manager - Get details and update status of donation appointment of his city
router
  .route("/donations/:id")
  .get(isLoggedIn, customRole("manager"), getDonationAppointmentDetails)
  .patch(isLoggedIn, customRole("manager"), updateAppointmentDonation);

// * REQUEST
// Manager - Get list of request appointment of his city
router
  .route("/requests")
  .get(isLoggedIn, customRole("manager"), getRequestAppointments);

// Manager - Get details and update status of request appointment of his city.
router
  .route("/requests/:id")
  .get(isLoggedIn, customRole("manager"), getRequestAppointmentDetails)
  .patch(isLoggedIn, customRole("manager"), updateAppointmentRequest);

module.exports = router;
