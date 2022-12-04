const express = require("express");
const {
  register,
  login,
  refreshTokenController,
} = require("../controller/admin.controller");
const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/refresh-token", refreshTokenController);

module.exports = router;
