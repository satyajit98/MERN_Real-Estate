const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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
