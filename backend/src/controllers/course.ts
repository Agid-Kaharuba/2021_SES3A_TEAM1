import { Request, Response } from "express";
import Course from "../model/course";

export default class CourseController {
    public async getAll(req: Request, res: Response) {
        const courses = await Course.find();
        res.json(courses)
    }

    public async get(req: Request, res: Response) {
        const course = await Course.findOne({
			_id: req.params.courseId
		});
        res.json(course)
    }

    public async create(req: Request, res: Response) {
		const body = req.body;
		const newCourseRequest = new Course({
			name: body.name,
			description: body.description
		} as any);
		newCourseRequest.save();
        res.json(newCourseRequest);
    }
}