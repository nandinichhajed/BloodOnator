// Model
const City = require("../../models/city");

// Utils
const customError = require("../../utils/customError");

// * Role -> User

// Get all city details
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find().select(["_id", "label", "value"]);

    // Response
    res.json({
      status: "success",
      cities,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get city details by param as city name
exports.getCityDetailsByCityName = async (req, res) => {
  try {
    const cityName = req.params.city.toLowerCase();
    const city = await City.findOne({ name: cityName });

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
