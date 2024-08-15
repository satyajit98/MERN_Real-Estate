const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const listingRouter = require("./routes/listing.router");
const path = require("path");

//connect to db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    //app listening
    app.listen(4000, () => {
      console.log("server is running on port: 4000 and connected to db");
    });
  })
  .catch((error) => {
    console.log(error);
  });

//create dynamic dir name
const __variable = path.resolve();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//create static folder
app.use(express.static(path.join(__variable, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__variable, "forntend", "dist", "index.html"));
});

//middleware for error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
