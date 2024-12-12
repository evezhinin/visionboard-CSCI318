const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// visionBoardController.js
const {
    createVisionBoard,
    getVisionBoardsByUserId,
    updateVisionBoard,
    deleteVisionBoard,
  } = require("../models/visionBoardModel");
  const { verifyToken } = require("../controllers/userController");
  
  // Create a new vision board
const createBoard = async (req, res) => {
    try {
      const decoded = verifyToken(req); // Extract userId from the token
  
      const { title, boardData } = req.body;
      console.log("Received data:", { title, boardData });

  
      if (!title) {
        return res.status(400).json({ error: "Title is required to create a vision board" });
      }
      // Log userId to ensure it's being extracted correctly
    console.log("Decoded userId:", decoded.userId);
    if (!decoded.userId) {
        return res.status(400).json({ error: "User ID is required to create a vision board" });
      }
  
      const newBoard = await createVisionBoard(decoded.userId, title, boardData);
      res.status(201).json(newBoard);
    } catch (error) {
      console.error("Error creating vision board:", error.message);
      res.status(500).json({ error: "Failed to create vision board" });
    }
  };
  
  
  // Get all vision boards for a specific user
  const getUserVisionBoards = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required to fetch vision boards" });
    }
  
    try {
      const boards = await getVisionBoardsByUserId(parseInt(userId, 10));
      res.status(200).json(boards);
    } catch (error) {
      console.error("Error fetching vision boards:", error.message);
      res.status(500).json({ error: "Failed to fetch vision boards" });
    }
  };
  
  // Update a vision board
  const updateBoard = async (req, res) => {
    const { boardId } = req.params;
    const { boardData } = req.body;
  
    if (!boardData) {
      return res.status(400).json({ error: "Board data is required for update" });
    }
  
    try {
      const updatedBoard = await updateVisionBoard(parseInt(boardId, 10), boardData);
      res.status(200).json(updatedBoard);
    } catch (error) {
      console.error("Error updating vision board:", error.message);
      res.status(500).json({ error: "Failed to update vision board" });
    }
  };
  
  // Delete a vision board
  const deleteBoard = async (req, res) => {
    const { boardId } = req.params;
  
    try {
      await deleteVisionBoard(parseInt(boardId, 10));
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting vision board:", error.message);
      res.status(500).json({ error: "Failed to delete vision board" });
    }
  };


  const getVisionBoardById = async (req, res) => {
    const { boardId } = req.params;
  
    try {
      const visionBoard = await prisma.visionBoard.findUnique({
        where: { id: parseInt(boardId, 10) },
      });
  
      if (!visionBoard) {
        return res.status(404).json({ error: "Vision board not found" });
      }
  
      res.status(200).json(visionBoard);
    } catch (error) {
      console.error("Error fetching vision board:", error.message);
      res.status(500).json({ error: "Failed to fetch vision board" });
    }
  };
  
  
  module.exports = {
    createBoard,
    getUserVisionBoards,
    updateBoard,
    deleteBoard,
    getVisionBoardById,
  };
  