const router = require("express").Router();

// auth Controller
const { register, login, logout, logoutAll } = require("../controllers/auth");

// User middleware
const { isLoggedIn } = require("../middlewares/user");

// Registration
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(isLoggedIn, logout);

// Logout from all accounts
router.route("/logout/all").get(isLoggedIn, logoutAll);

module.exports = router;
