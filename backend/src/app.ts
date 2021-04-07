import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Routes } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import ApiInitializer from "./initializer";
import morgan from "morgan";

dotenv.config();

const mongo_uri = process.env.DATABASE_URL as string;
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
	if (err) {
		throw err;
	} else {
		console.log(`Successfully connected to ${mongo_uri}`);
	}
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
const apiInit = new ApiInitializer(app);
Routes(apiInit);

// Default route
app.get("/", (req, res) => {
	res.json({
		stage: process.env.stage,
		msg: "Hello world from XRT Training API 🚀🚀🚀🚀!"
	});
});
  
// Startup complete
const server = app.listen(process.env.API_PORT, () => {
    console.log(`Server is now running at:  http://localhost:${process.env.API_PORT}`);
});