

const express = require("express");
const {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Define routes for users
router.post("/register", register);
router.post("/login", login);
router.get("/:user_id", getUserById);
router.put("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);

module.exports = router;



