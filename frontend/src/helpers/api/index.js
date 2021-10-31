import { verify, registerUser, loginUser } from "./auth";
import { 
  createFloor,
  getAllFloors,
  getFloor,
  updateFloor,
  deleteFloor,
  getTheFloor,
  updateTheFloor,
} from "./floor";
import {
  getAllUser,
  getCurrentUser,
  getUser,
  updateUser,
  uploadImage,
  downloadImage,
  searchUser,
  deleteUser,
} from "./user";
import {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  getCourseStats,
  getAllCoursesWith
} from "./course";
import { getAllTasks, createTask, getTask, updateTask } from "./task";
import {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  getRecipe,
  deleteRecipe,
} from "./recipe";
import {
  getProgress,
  downloadTracking,
  getTrackingPerformance,
  getTrackingPerformanceUser
} from "./progress";

import dotenv from "dotenv";
dotenv.config();

export const API_HOST =
  process.env.REACT_APP_API_HOST ??
  "http://ec2-13-55-156-75.ap-southeast-2.compute.amazonaws.com:4000";

export default {
  auth: {
    verify: verify,
    login: loginUser,
    register: registerUser,
  },
  user: {
    current: getCurrentUser,
    all: getAllUser,
    get: getUser,
    update: updateUser,
    upload: uploadImage,
    download: downloadImage,
    search: searchUser,
    delete: deleteUser,
  },
  course: {
    getAll: getAllCourses,
    create: createCourse,
    get: getCourse,
    update: updateCourse,
    getAllWith: getAllCoursesWith
  },
  task: {
    getAll: getAllTasks,
    create: createTask,
    get: getTask,
    update: updateTask,
  },
  recipe: {
    getAll: getAllRecipes,
    create: createRecipe,
    update: updateRecipe,
    delete: deleteRecipe,
    get: getRecipe,
  },
  stats: {
    course: getCourseStats
  },
  progress: {
    get: getProgress,
    download: downloadTracking,
    performance: getTrackingPerformance,
    user: getTrackingPerformanceUser
  },
  floor: {
    create: createFloor,
    getThe: getTheFloor,
    updateThe: updateTheFloor,
  },
};
