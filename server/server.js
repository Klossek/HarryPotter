// Loads the configuration from config.env to process.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 5000;
const corsOptions = require("./config/corsOptions");

const cookieParser = require("cookie-parser");

const app = express();

mongoose.connect(process.env.MONGODB_HOST, () => {
  console.log("connected mongoose");
});

//Middleware
app.use(express.json());
app.use(express.static("public"));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

//route middleware
const authRoute = require("./routes/auth");

//in authRoute /users is added
app.use("/auth", authRoute);

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const testRouter = require("./routes/test");
app.use("/test", testRouter);

// Global error handling
app.use(function (e) {
  console.log("GLOBAL ERROR HANDLING", e);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
