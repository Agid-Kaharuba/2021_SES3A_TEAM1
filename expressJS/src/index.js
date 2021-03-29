import express from "express";
import bodyParser from "body-parser";
import env from "./helpers/env";
const morgan = require("morgan");

const app = express();
const config = {
  port: env.port,
  stage: env.stage
};

// TODO Middleware

// Default route
app.get("/", (req, res) => {
  res.json({
    stage: config.stage,
    msg: "XRT TRAINING"
  });
});

// Startup complete
const server = app.listen(config.port, () => {
  console.log(`Server is now running at:  http://localhost:${config.port}`);
});

module.exports = server;
