// Model
const Request = require("../../models/request");
const City = require("../../models/city");

// Utils
const customError = require("../../utils/customError");

// * Role -> User

// Create Receiver
exports.createReceiver = async (req, res) => {
  // Checking all the fields are present
  const { ml, city, country, bloodGroup } = req.body;
  if (!ml || !city || !country || !bloodGroup) {
    return customError(
      res,
      400,
      "ml, city, bloodGroup and country are required"
    );
  }

  try {
    // Checking is city exists
    let isCityExist = await City.findOne({ city });

    // If not exist than creating new
    if (!isCityExist) {
      return customError(res, 401, "No city", "error");
    }

    // Getting current month
    const monthData = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    const month = monthData[d.getMonth()];
    const year = d.getFullYear();

    // Creating new Received
    const newReceived = await Request.create({
      user: req.user._id,
      month,
      year,
      cityID: isCityExist._id,
      bloodGroup,
      ...req.body,
    });

    // Updating City with new Received and if city has less amount throw error
    if (Number(isCityExist[bloodGroup]) < Number(ml)) {
      return customError(res, 401, "City does not have enough blood", "error");
    }
    isCityExist[bloodGroup] = Number(isCityExist[bloodGroup]) - Number(ml);
    await isCityExist.save();

    // Updating user new receivedBlood
    req.user.receivedBlood = req.user.receivedBlood + 1;
    await req.user.save();

    // Response
    res.status(201).json({
      status: "success",
      newReceived,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get all received blood details
exports.getAllUserReceivedBlood = async (req, res) => {
  try {
    const received = await Request.find({ user: req.user._id });

    // Response
    res.json({
      status: "success",
      results: received.length,
      data: received,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get single user received blood details
exports.getSingleUserReceivedBloodDetails = async (req, res) => {
  try {
    const received = await Request.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    // Response
    res.json({
      status: "success",
      data: received,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
