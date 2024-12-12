

// visionBoardModel.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to create a new vision board
const createVisionBoard = async (userId, title, boardData) => {
  if (!userId) {
    throw new Error("User ID is required to create a vision board");
  }
  
  return await prisma.visionBoard.create({
    data: {
      userId,
      title,
      boardData,
    },
  });
};

// Function to get all vision boards for a user
const getVisionBoardsByUserId = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch vision boards");
  }
  
  return await prisma.visionBoard.findMany({
    where: { userId },
  });
};

// Function to update a vision board
const updateVisionBoard = async (boardId, boardData) => {
  return await prisma.visionBoard.update({
    where: { id: boardId },
    data: { boardData },
  });
};

// Function to delete a vision board
const deleteVisionBoard = async (boardId) => {
  return await prisma.visionBoard.delete({
    where: { id: boardId },
  });
};

module.exports = {
  createVisionBoard,
  getVisionBoardsByUserId,
  updateVisionBoard,
  deleteVisionBoard,
};
