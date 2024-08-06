const express = require("express");
const {
  createListing,
  deleteListing,
  editListing,
} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, editListing);

module.exports = router;
