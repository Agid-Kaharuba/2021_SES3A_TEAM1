import ApiInitializer from "../initializer";
import { CourseRoute } from "./course-router";
import { RecipeRoute } from "./recipe-router";
import CourseController from "../controllers/course";
import RecipeController from "../controllers/recipe";


export const Routes = (init: ApiInitializer) => {
    CourseRoute(init.getApp(), new CourseController());
    RecipeRoute(init.getApp(), new RecipeController());
}