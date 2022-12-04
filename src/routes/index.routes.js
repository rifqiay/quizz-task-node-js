const express = require("express");
const router = express.Router();
const crudRouter = require("./crud.routes");
const adminRouter = require("./admin.routes");

router.use("/", crudRouter).use("/admin", adminRouter);

module.exports = router;
