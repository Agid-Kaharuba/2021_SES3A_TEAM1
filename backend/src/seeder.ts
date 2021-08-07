import mongoose, { Model, Document } from 'mongoose';
import dotenv from 'dotenv';
import { callbackify } from 'node:util';
import { RecipeRoute } from './routes/recipe-router';

// Seed data
import EmployeesData from './seed-data/employees.json';
import SupervisorsData from './seed-data/supervisors.json';
import RecipesData from './seed-data/recipes.json';
import TasksData from './seed-data/tasks.json';
import CoursesData from './seed-data/courses.json';

// Mongo models
import User from './model/user';
import Recipe from './model/recipe';
import Task from './model/task';
import Course from './model/course';
import course from './model/course';

dotenv.config();

async function main() {
  const mongo_uri = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}` as string;
  await mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${process.env.DATABASE_NAME}`);
    }
  });

  await wipe();
  await seed();

  mongoose.disconnect();
}

async function wipe() {
  await User.deleteMany({});
  await Course.deleteMany({});
  await Task.deleteMany({});
  await Recipe.deleteMany({});
}

async function seed() {
  try {
    const Employees: Document[] = await EmployeesData.map((data) => new User(data));
    const Supervisors: Document[] = await SupervisorsData.map((data) => new User(data));
    const Recipes: Document[] = await RecipesData.map((data) => new Recipe(data));
    const Tasks: Document[] = await TasksData.map((data) => new Task({ ...data, recipe: Recipes[data.recipe] }));
    const Courses: Document[] = await (CoursesData as any[]).map((data) => new Course({
      ...data,
      tasks: data.tasks.map((i: number) => Tasks[i]),
      assignedEmployees: data.assignedEmployees.map((i: number) => Employees[i]),
    }));

    await save([Employees, Supervisors, Recipes, Tasks, Courses]);
  } catch (e) {
    console.log(`Error ${e}`);
  }
}

async function save(models: Document[][]) {
  await Promise.all(models.map(async (model) => await Promise.all(model.map(async (obj) => obj.save()))));
}

main();
