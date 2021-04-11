import ApiInitializer from "../initializer";
import { CourseRoute } from "./course-router";
import CourseController from "../controllers/course";
import { UserRoute } from "./user-router";
import UserController from "../controllers/user";


export const Routes = (init: ApiInitializer) => {
    CourseRoute(init.getApp(), new CourseController());
    UserRoute(init.getApp(), new UserController());
}