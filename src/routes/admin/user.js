const router = require("express").Router();

// Admin - user Controller
const {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require("../../controllers/admin/user");

// User middleware
const { isLoggedIn, customRole } = require("../../middlewares/user");

// * Admin route
router.route("/users").get(isLoggedIn, customRole("admin"), getAllUsers);

// Admin getting, updating and deleting single user
router
  .route("/users/:id")
  .get(isLoggedIn, customRole("admin"), getSingleUser)
  .patch(isLoggedIn, customRole("admin"), updateSingleUser)
  .delete(isLoggedIn, customRole("admin"), deleteSingleUser);
module.exports = router;
