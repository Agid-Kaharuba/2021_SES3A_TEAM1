import ApiInitializer from "../initializer";
import { CourseRoute } from "./course-router";
import CourseController from "../controllers/course";


export const Routes = (init: ApiInitializer) => {
    CourseRoute(init.getApp(), new CourseController());
}