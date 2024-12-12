

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import required packages
const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const multer = require("multer");
const path = require('path');
const cors = require("cors");
require("dotenv").config();

// Import other routes
const userRoutes = require("./routes/userRoute");
const visionBoardRoutes = require("./routes/visionBoardRoute");


// Initialize app
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Parse JSON bodies in requests
app.use(morgan("dev")); // Logging requests to the console for easier debugging
app.use((req, res, next) => {
    console.log("Request Body:", req.body);
    next();
});
  
const allowedOrigins = ['http://localhost:5174']; // Make sure there's no trailing slash
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Unsplash API Route - Backend Proxy
app.get("/api/unsplash/images", async (req, res) => {
    const { query } = req.query; // Get the search term from the query params
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: { query },
            headers: {
                Authorization: `Client-ID ${unsplashAccessKey}`,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching data from Unsplash:", error.message);
        res.status(500).json({ error: "Failed to fetch images from Unsplash" });
    }
});

// Set up multer to save images to a local folder (e.g., 'uploads/')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, 'uploads')); // Use absolute path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Define a route for uploading vision board images
app.post('/vision-boards/upload-image', upload.single('visionBoardImage'), async (req, res) => {
    try {
        const { boardId } = req.body;
        console.log("Received boardId:", boardId);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        if (!boardId) {
            return res.status(400).json({ error: "Board ID is required" });
        }

        const parsedBoardId = parseInt(boardId, 10);
        if (isNaN(parsedBoardId)) {
            return res.status(400).json({ error: "Invalid board ID" });
        }

        const imagePath = `uploads/${req.file.filename}`;

        // Update the vision board with the image path using boardId
        const updatedVisionBoard = await prisma.visionBoard.update({
            where: { id: parsedBoardId },
            data: { imageUrl: imagePath },
        });

        res.status(200).json({ message: 'Image saved successfully', data: updatedVisionBoard });
    } catch (error) {
        console.error('Error saving vision board image:', error);
        res.status(500).json({ error: 'Failed to save vision board image' });
    }
});

// Define other routes
app.use("/users", userRoutes);
app.use("/vision-boards", visionBoardRoutes);

// Base route
app.get("/", (req, res) => {
    res.send("Hello from the other side");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
