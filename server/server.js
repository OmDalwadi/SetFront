const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Connects to mongoDB
const path = require("path");

require("dotenv").config(); // Set ENV files from .env file
require("./config/db.js")

const app = express();
const port = process.env.PORT || 3000;

/* Middleware */
app.use(cors());
app.use(express.json()); // Parse JSON, because we send and recieve



/* Sets router paths for API calls */
// Loads router from other files
// const roomsRouter = require("./routes/rooms");
// const playersRouter = require("./routes/players");
// Adds router as middleware
// app.use("/rooms", roomsRouter);
// app.use("/players", playersRouter);

// /* All other paths not used for API calls are used to display pages in our application */
// // Serves Static Assets in production
// app.use(express.static("../client/build"));
// // Launches latest react build (from npm run build)
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
// });


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


/* Server Start */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});