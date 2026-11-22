require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectDB = require("./config/db");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const insuranceRoutes = require("./routes/insurance/insuranceRoutes");
const medicalLoanRoutes = require("./routes/medical/medicalRoutes");
const communityRoutes = require("./routes/community/communityRoutes");
const conditionRoutes = require("./routes/conditions/conditionRoutes");
const appointmentRoutes = require("./routes/appointments/appointmentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (insurance documents) so the admin dashboard can open them
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "O Positive Health API is running",
  });
});

// Register routes
// Specific /api/... routes pehle, taaki generic '/api' (userRoutes) unhe na roke
app.use("/api/admin", adminRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/medical-loan", medicalLoanRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/conditions", conditionRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api", userRoutes);

// Multer / upload error handler (must come AFTER routes)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message?.includes("Only PDF")) {
    return res.status(400).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "File is too large. Maximum size is 5 MB."
          : err.message,
    });
  }
  next(err);
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();