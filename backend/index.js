const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

//express app
const app = express();

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

//middleware
app.use(express.json());

//routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
