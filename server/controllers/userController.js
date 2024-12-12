

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByUsername,
  findUserById,
  updateUserById,
  deleteUserById,
} = require("../models/userModel");

// Helper function for JWT verification
const verifyToken = (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new Error("Unauthorized - No token provided");
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error("Unauthorized - No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);
    res.status(200).json(user);
  } catch (error) {
    console.error("User register error:", error);
    res.status(400).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const decoded = verifyToken(req);
    console.log("Decoded token:", decoded);

    const user = await findUserById(decoded.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { username } = req.body;

  try {
    const decoded = verifyToken(req);
    console.log("Decoded token:", decoded);

    const updatedUser = await updateUserById(decoded.userId, {
      username,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Error updating user with id ${decoded.userId}:`, error);
    res.status(401).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const decoded = verifyToken(req);
    console.log("Decoded token:", decoded);

    await deleteUserById(decoded.userId);
    res.status(204).end(); // Successfully deleted, no content to return
  } catch (error) {
    console.error(`Error deleting user with id ${decoded.userId}:`, error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getUserById,
  verifyToken,
};
