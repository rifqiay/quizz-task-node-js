const express = require("express");
const router = express.Router();
const {
  createController,
  getByAccountNumberController,
  getByIdentityNumberController,
  updateController,
  deleteController,
  getAllController,
} = require("../controller/crud.controller");
const protect = require("../middleware/protect");

router
  .post("/create", protect, createController)
  .get(
    "/get-account-number/:accountNummber",
    protect,
    getByAccountNumberController
  )
  .get(
    "/get-identity-number/:identitynumber",
    protect,
    getByIdentityNumberController
  )
  .put("/update/:id", protect, updateController)
  .delete("/delete/:id", protect, deleteController)
  .get("/", protect, getAllController);

module.exports = router;
