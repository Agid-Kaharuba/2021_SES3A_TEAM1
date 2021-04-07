import { Request, Response } from "express";
import Course from "../model/course";

export default class CourseController {
    public async getAll(req: Request, res: Response) {
        const courses = await Course.find();
        res.json(courses)
    }
}