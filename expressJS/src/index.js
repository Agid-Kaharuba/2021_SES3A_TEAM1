import express from "express";
import bodyParser from "body-parser";
import env from "./helpers/env";
import mongoose from "mongoose";
import cors from "cors";
const morgan = require("morgan");

import courseRouter from "./routes/course-router.js";


mongoose.connect(env.databaseUrl, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to Database"));


const app = express();
const config = {
  port: env.port,
  stage: env.stage
};

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/course", courseRouter);

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
