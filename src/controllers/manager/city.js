// Model
const City = require("../../models/city");

// Utils
const customError = require("../../utils/customError");

// * Role -> Manager

// Manager city details
exports.getManagersCity = async (req, res) => {
  try {
    const city = await City.findOne({ manager: req.user._id });

    // If city not found
    if (!city) {
      return customError(res, 404, "City not found", "error");
    }

    // Response
    res.json({
      status: "success",
      data: city,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
