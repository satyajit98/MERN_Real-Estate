const express = require("express");
const { getUser, updateUser } = require("../controllers/user.controllers");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.get("/test", getUser);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
