import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Routes } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import ApiInitializer from "./initializer";
import morgan from "morgan";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';

dotenv.config();

const mongo_uri = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}` as string;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
	if (err) {
		throw err;
	} else {
		console.log(`Successfully connected to ${process.env.DATABASE_NAME}`);
	}
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Swagger Docs
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.1',
		info: {
			title: 'XRT Training',
			version: '1.0.0'
		},
		basePath: '/',
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		security: [{
			bearerAuth: []
		}]
	},
	apis: ['src/app.ts', 'src/routes/*']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
if (process.env.STAGE !== 'prod') {
	fs.writeFileSync('../docs/swagger/swagger.json', JSON.stringify(swaggerDocs));
}
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Routes
const apiInit = new ApiInitializer(app);
Routes(apiInit);

// Default route
/**
 * @swagger
 * /:
 *  get:
 *   description: Default route
 *   responses:
 *    200:
 *     description: Success
 */
app.get("/", (req, res) => {
	res.json({
		stage: process.env.stage,
		msg: "Hello world from XRT Training API 🚀🚀🚀🚀!"
	});
});

// Startup complete
const server = app.listen(process.env.API_PORT, () => {
	console.log(`Server is now running at:  http://localhost:${process.env.API_PORT}`);
	console.log(`Swagger Docs            :  http://localhost:${process.env.API_PORT}/swagger`);
});

module.exports = server;