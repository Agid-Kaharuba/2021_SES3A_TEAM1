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
  downloadImage
} from "./user";
import {
  getAllCourses,
  createCourse
} from "./course";
import {
  getAllTasks,
  createTask,
  getTask
} from "./task";

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
    download: downloadImage
  },
  course: {
    getAll: getAllCourses,
    create: createCourse
  },
  task: {
    getAll: getAllTasks,
    create: createTask,
    get: getTask
  }
}