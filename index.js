const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware for parsing request body and logging requests
app.use(bodyParser.json());
app.use(logger("dev"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/", fileRoutes);

// Serve the main HTML file for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server listening on port 3001 for incoming requests
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Visit http://localhost:${port} to access the UI`);
});
