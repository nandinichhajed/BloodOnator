// Model
const Appointment = require("../../models/appointment");
const City = require("../../models/city");

// Utils
const customError = require("../../utils/customError");

// * Role -> User

// User Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { city, date, type } = req.body;

    // If city date and type not found
    if (!city || !date || !type) {
      return customError(res, 401, "City, date and type are required", "error");
    }

    //Checking is valid city
    const isValidCity = await City.findOne({ _id: city });

    // If city does not exist
    if (!isValidCity) {
      return customError(res, 404, "City not found", "error");
    }

    // If request type appointment than blood group and amount are required
    if (type === "request") {
      const { amount, bloodGroup } = req.body;
      if (!amount || !bloodGroup) {
        return customError(
          res,
          401,
          "For request blood group and amount are required",
          "error"
        );
      }
    }

    // If type request blood group will be provided from body
    const bloodGroup = req.body.bloodGroup || req.user.bloodGroup;
    const amount = req.body.amount || 0;

    // Creating Appointment
    const appointment = await Appointment.create({
      user: req.user._id,
      city,
      date,
      type,
      status: "appointment",
      bloodGroup,
      amount,
    });

    // Response
    res.status(201).json({
      status: "success",
      message: "Appointment created",
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    customError(res, 500, error.message, "error");
  }
};

// * Donation Appointment Controllers
// Get Donation appointments of user
exports.getUserDonationAppointments = async (req, res) => {
  try {
    // Finding user donation appointments
    const appointments = await Appointment.find({
      user: req.user._id,
      type: "donation",
    });

    // Response
    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: appointments,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get single Donation appointment of user
exports.getUserDonationAppointmentById = async (req, res) => {
  try {
    // Finding user donation appointment from id
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
      type: "donation",
    });

    // If appointment does not exist
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    // Response
    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Update status of user donation appointment as cancelled
exports.updateUserDonationAppointmentAsCancelled = async (req, res) => {
  try {
    // Finding user donation appointment from id
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
      type: "donation",
    });

    // If appointment does not exist
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    appointment.status = "cancelled";
    await appointment.save();

    // Response
    res.status(200).json({
      status: "success",
      message: "Appointment Cancelled Successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// * Request Appointment Controllers
// Get Request appointments of user
exports.getUserRequestAppointments = async (req, res) => {
  try {
    // Finding user Request appointments
    const appointments = await Appointment.find({
      user: req.user._id,
      type: "request",
    });

    // Response
    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: appointments,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get single Request appointment of user
exports.getUserRequestAppointmentById = async (req, res) => {
  try {
    // Finding user Request appointment from id
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
      type: "request",
    });

    // If appointment does not exist
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    // Response
    res.status(200).json({
      status: "success",
      appointment,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Update status of user Request appointment as cancelled
exports.updateUserRequestAppointmentAsCancelled = async (req, res) => {
  try {
    // Finding user Request appointment from id
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
      type: "request",
    });

    // If appointment does not exist
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    appointment.status = "cancelled";
    await appointment.save();

    // Response
    res.status(200).json({
      status: "success",
      message: "Appointment Cancelled Successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
