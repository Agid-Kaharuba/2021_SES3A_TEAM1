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
  createCourse,
  getCourse,
  updateCourse,
  getCourseStats
} from "./course";
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask
} from "./task";
import {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  getRecipe
} from "./recipe";

//export const API_HOST = "http://localhost:4000";
export const API_HOST = "http://ec2-54-206-90-20.ap-southeast-2.compute.amazonaws.com:4000";

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
    create: createCourse,
    get: getCourse,
    update: updateCourse
  },
  task: {
    getAll: getAllTasks,
    create: createTask,
    get: getTask,
    update: updateTask
  },
  recipe: {
    getAll: getAllRecipes,
    create: createRecipe,
    update: updateRecipe,
    get: getRecipe
  },
  stats: {
    course: getCourseStats
  }
}
