// Model
const Appointment = require("../../models/appointment");
const City = require("../../models/city");
const Donation = require("../../models/donation");
const Request = require("../../models/request");

// Utils
const customError = require("../../utils/customError");

// * For Donation

// Manager get list of donation appointments of his city
exports.getDonationAppointments = async (req, res) => {
  try {
    const city = await City.findOne({ manager: req.user._id });
    const appointments = await Appointment.find({
      city: city._id,
      type: "donation",
      status: "appointment",
    });

    // Response
    res.json({
      status: "success",
      results: appointments.length,
      appointments,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Manager get details of donation appointment of his city
exports.getDonationAppointmentDetails = async (req, res) => {
  try {
    const city = await City.findOne({ manager: req.user._id });
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      city: city._id,
      type: "donation",
    });

    // If appointment not found
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    // Response
    res.json({
      status: "success",
      appointment,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Manager update status and create donation
exports.updateAppointmentDonation = async (req, res) => {
  // Destructuring
  const { status } = req.body;

  // If status is not found
  if (!status) {
    return customError(res, 404, "Status is required", "error");
  }

  // If status is same
  if (status === "appointment") {
    return customError(res, 404, "Status is required", "error");
  }
  try {
    const city = await City.findOne({ manager: req.user._id });
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      city: city._id,
      type: "donation",
    });

    // If appointment not found
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    // If appointment was already cancelled
    if (
      appointment.status === "cancelled" ||
      appointment.status === "completed"
    ) {
      return customError(
        res,
        404,
        "Appointment already cancelled or completed",
        "error"
      );
    }

    // If status is cancelled no need of creating donation
    if (status === "cancelled") {
      appointment.status = "cancelled";
      await appointment.save();
    } else {
      // A donation must contain the amount of blood donated
      if (!req.body.amount) {
        return customError(res, 404, "amount is required", "error");
      }
      appointment.status = "completed";
      await appointment.save();

      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();

      // Creating new Donation
      const donation = await Donation.create({
        bloodGroup: req.user.bloodGroup,
        amount: req.body.amount,
        user: req.user._id,
        city: city._id,
        appointment: appointment._id,
        month,
        year,
      });
      // Updating City with new donation
      city[req.user.bloodGroup] =
        Number(city[req.user.bloodGroup]) + Number(req.body.amount);
      await city.save();

      // Updating user new donation
      req.user.donatedBlood = req.user.donatedBlood + 1;
      req.user.donatedInPastThreeMonths = true;
      req.user.lastDonatedOn = donation.createdAt;
      await req.user.save();
    }

    // Response
    res.json({
      status: "success",
      message: "Appointment updated successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// * For Request
// Manager get list of Request appointments of his city
exports.getRequestAppointments = async (req, res) => {
  try {
    const city = await City.findOne({ manager: req.user._id });
    const appointments = await Appointment.find({
      city: city._id,
      type: "request",
    });

    // Response
    res.json({
      status: "success",
      results: appointments.length,
      appointments,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Manager get details of Request appointment of his city
exports.getRequestAppointmentDetails = async (req, res) => {
  try {
    const city = await City.findOne({ manager: req.user._id });
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      city: city._id,
      type: "request",
    });

    // If appointment not found
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    // Response
    res.json({
      status: "success",
      appointment,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Manager update status and create request
exports.updateAppointmentRequest = async (req, res) => {
  // Destructuring
  const { status } = req.body;

  // If status is not found
  if (!status) {
    return customError(res, 404, "Status is required", "error");
  }

  // If status is same
  if (status === "appointment") {
    return customError(res, 404, "Status is required", "error");
  }
  try {
    const city = await City.findOne({ manager: req.user._id });
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      city: city._id,
      type: "request",
    });

    // If appointment not found
    if (!appointment) {
      return customError(res, 404, "Appointment not found", "error");
    }

    // If appointment was already cancelled
    if (
      appointment.status === "cancelled" ||
      appointment.status === "completed"
    ) {
      return customError(
        res,
        404,
        "Appointment already cancelled or completed",
        "error"
      );
    }

    // If status is cancelled no need of creating Request
    if (status === "cancelled") {
      appointment.status = "cancelled";
      await appointment.save();
    } else {
      // A Request must contain the amount of blood requested
      if (!req.body.amount) {
        return customError(res, 404, "amount is required", "error");
      }

      // Updating City with new request and if city has less amount throw error
      if (Number(city[appointment.bloodGroup]) < Number(req.body.amount)) {
        return customError(
          res,
          401,
          "City does not have enough blood",
          "error"
        );
      }
      city[appointment.bloodGroup] =
        Number(city[appointment.bloodGroup]) - Number(req.body.amount);
      await city.save();

      // Updating user new requestedBlood
      req.user.requestedBlood = req.user.requestedBlood + 1;
      await req.user.save();

      // Creating new Request
      await Request.create({
        bloodGroup: req.user.bloodGroup,
        amount: req.body.amount,
        user: req.user._id,
        city: city._id,
        appointment: appointment._id,
      });
      appointment.status = "completed";
      await appointment.save();
    }

    // Response
    res.json({
      status: "success",
      message: "Appointment updated successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
