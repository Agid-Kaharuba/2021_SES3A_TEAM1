import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// import morgan from "morgan";
import courseRouter from "./routes/course-router"


dotenv.config();

const mongo_uri = process.env.DATABASE_URL as string;
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
	if (err) {
		throw err;
	} else {
		console.log(`Successfully connected to ${mongo_uri}`);
	}
});

const app: Application = express();


// Routes
app.use("/course", courseRouter);

const server = app.listen(process.env.API_PORT, () => {
    console.log(`Server is now running at:  http://localhost:${process.env.API_PORT}`);
});