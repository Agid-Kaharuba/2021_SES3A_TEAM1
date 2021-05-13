import {
  verify,
  registerUser,
  loginUser
} from "./auth";
import {
  getAllUser,
  getCurrentUser,
  getUser,
  updateUser,
  uploadImage,
  downloadImage,
  searchUser
} from "./user";
import {
  getAllCourses,
  createCourse
} from "./course";
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask
} from "./task";
import {
  getAllRecipes,
  createRecipe
} from "./recipe";

export const API_HOST = "http://localhost:4000";

export default {
  auth: {
    verify: verify,
    login: loginUser,
    register: registerUser
  },
  user: {
    current: getCurrentUser,
    all: getAllUser,
    get: getUser,
    update: updateUser,
    upload: uploadImage,
    download: downloadImage,
    search: searchUser
  },
  course: {
    getAll: getAllCourses,
    create: createCourse
  },
  task: {
    getAll: getAllTasks,
    create: createTask,
    get: getTask,
    update: updateTask
  },
  recipe: {
    getAll: getAllRecipes,
    create: createRecipe
  }
}