const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer"); 
const fs = require('fs')

require("dotenv").config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions));

app.post('/test', (req, res) => {
    console.log(req.body);
    res.json({ received: req.body });
});

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const nokRoutes = require('./routes/nextOfKinRoutes');
const uploadsRoutes = require('./routes/uploadsRoutes');
const sentimentsRoutes = require('./routes/sentimentsRoutes');
const emailRoutes = require('./routes/emailRoutes')

app.use('/auth', authRoutes);
app.use('/email', emailRoutes);
app.use('/users', userRoutes);
app.use('/next_of_kins', nokRoutes);
app.use('/sentiments', sentimentsRoutes);
app.use('/upload', uploadsRoutes)


// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads"; // Directory to save images
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadDir); // Set destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/Documents", express.static(path.join(__dirname, "Documents")));

app.post("/uploads", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const filePath = path.join("uploads", req.file.filename); // Get the file path
  res.json({ path: filePath }); // Return the file path as JSON
});

app.get("/", (req, res) => {
  res.send("ZICOSU BACKEND RUNNING"); // Response for the root URL
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`ZICOSU server running on port ${PORT}`));


