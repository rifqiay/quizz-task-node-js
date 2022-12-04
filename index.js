require("dotenv").config();
const express = require("express");
const app = express();
const mainRouter = require("./src/routes/index.routes");
// const redis = require('redis')

app.use(express.json());

app.use("/api", mainRouter);

app.listen(5000, () => {
  console.log("running on port 5000");
});
