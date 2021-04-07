import { Express } from "express";
import CourseController from "../controllers/course";

export const CourseRoute = (app: Express, controller: CourseController) => {
    app.get("/course", controller.getAll);
    app.get("/course/:courseId", controller.get);
    app.post("/course", controller.create);
}