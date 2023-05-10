const router = require("express").Router();

// City manager
const { getManagersCity } = require("../../controllers/manager/city");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * Manager City, route

// Details of his cities
router.route("/").get(isLoggedIn, customRole("manager"), getManagersCity);

module.exports = router;
