
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to create a new user
const createUser = async (username, password) => {
  return await prisma.user.create({
    data: { username, password },
  });
};

// Function to find user by username
const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

// Function to find user by user_id
const findUserById = async (user_id) => {
  try {
    const id = parseInt(user_id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid user_id. It must be a number.");
    }
  
    console.log("findUserById - user_id:", id);
    return await prisma.user.findUnique({
      where: { user_id: id },
    });
  } catch (error) {
    console.error("Error in findUserById:", error);
    throw error;
  }
};

// Function to update a user by user_id
const updateUserById = async (user_id, data) => {
  try {
    return await prisma.user.update({
      where: { user_id },
      data,
    });
  } catch (error) {
    console.error("Error updating user by user_id:", error);
    throw error;
  }
};

// Function to delete a user by user_id
const deleteUserById = async (user_id) => {
  try {
    return await prisma.user.delete({
      where: { user_id },
    });
  } catch (error) {
    console.error("Error deleting user by user_id:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  updateUserById,
  deleteUserById,
};
