

// visionBoardRoutes.js
const express = require("express");
const {
  createBoard,
  getUserVisionBoards,
  updateBoard,
  deleteBoard,
  getVisionBoardById
} = require("../controllers/visionBoardController");

const router = express.Router();

// Vision board routes
router.post("/", createBoard); // Create a new vision board
router.get("/user/:userId", getUserVisionBoards); // Get all vision boards for a specific user
router.get("/:boardId", getVisionBoardById);
router.put("/:boardId", updateBoard); // Update a specific vision board
router.delete("/:boardId", deleteBoard); // Delete a specific vision board
//router.get("/user/:userId/vision-boards", getUserVisionBoards); // Get all vision boards for a specific user


module.exports = router;
