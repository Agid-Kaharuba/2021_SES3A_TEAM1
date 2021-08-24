import { Server } from 'http';
import bodyParser from 'body-parser';
import config from './helpers/config';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import mongoose, { ObjectId } from 'mongoose';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import ApiInitializer from './initializer';
import { Routes } from './routes';
import Course from './model/course';
import Task from './model/task';
import Recipe from './model/recipe';

const mongoUri = `${config.DATABASE_URL}/${config.DATABASE_NAME}` as string;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    throw err;
  } else {
    // eslint-disable-next-line no-console
    console.log(`Successfully connected to ${config.DATABASE_NAME}`);
  }
});

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Swagger Docs
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'XRT Training',
      version: '1.0.0',
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
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
app.get('/', (req, res) => {
  res.json({
    stage: config.STAGE,
    msg: 'Hello world from XRT Training API 🚀🚀🚀🚀!',
  });
});

// Startup complete
const server: Server = app.listen(config.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now running at:  http://localhost:${config.API_PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger Docs:              http://localhost:${config.API_PORT}/swagger`);
});


// TODO move function to a new file in helper folder.
// Can call file anything. (maybe ./helpers/unity-data.ts)
//Create a course if it doesn't exists
async function masterData() {
  // // if the course doesn't exist we can assume the Recipe and Task wont.

  // if (no course){
  //   var recipe = new Recipe(...)
  //   await recipe.save()
  //   do same for task
  //   ...
  //   var course = new Course({..._id: "...", recipe: recipe ...})
  //   await course.save()
  // }

  if (!await Course.findOne({ _id: "0000000114758b5134935015" })) {
    let recipe = new Recipe({
      name: "Classic Burger",
      _id: new mongoose.Types.ObjectId("0000000282828b5134935015")
    } as any);
    await recipe.save();

    let task = new Task({
      name: "Beef Burger",
      recipe: recipe,
      type: "Test Course",
      _id: new mongoose.Types.ObjectId("0000000696969b5134935015")
    } as any);
    await task.save();

    const course = new Course({
      name: "Burger",
      description: "Test Course",
      tasks: [task],
      assignedEmployees: [],
      _id: new mongoose.Types.ObjectId("0000000114758b5134935015")
    } as any);
    await course.save();
  }


  // let masterRecipe;
  // let masterTask;
  // if (!(await Recipe.findOne({ _id: "0000000482828b5134935015" }))) {
  //   masterRecipe = await new Recipe({
  //     name: "Classic Burger",
  //     _id: new mongoose.Types.ObjectId("0000000482828b5134935015")
  //   } as any);
  //   await masterRecipe.save();
  // }

  // if (!await Task.findOne({ _id: "0000000696969b5134935015" })) {
  //   masterTask = await new Task({
  //     name: "Beef Burger",
  //     recipe: [masterRecipe],
  //     type: "Test Course",
  //     _id: new mongoose.Types.ObjectId("0000000696969b5134935015")
  //   } as any);
  //   await masterTask.save();
  // }


  // if (!await Course.findOne({ _id: "0000000114758b5134935015" })) {
  //   const masterCourse = await new Course({
  //     name: "Burger",
  //     description: "Test Course",
  //     tasks: [masterTask],
  //     assignedEmployees: [],
  //     _id: new mongoose.Types.ObjectId("0000000114758b5134935015")
  //   } as any);
  //   await masterCourse.save((err: any) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // }
}

masterData();


module.exports = server;
