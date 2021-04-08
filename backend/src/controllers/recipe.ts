import { Request, Response } from "express";
import Recipe from "../model/recipe";

export default class RecipeController {

    public async getAll(req: Request, res: Response){
        const recipes = await Recipe.find();
        res.json(recipes)
    }
    // public async getAll(req: Request, res: Response) {
    //     const courses = await Course.find({ archive: { $ne: true } });
    //     res.json(courses)
    // }

    // public async get(req: Request, res: Response) {
    //     const course = await Course.findOne({
	// 		_id: req.params.courseId
	// 	});
    //     res.json(course)
    // }

    // public async create(req: Request, res: Response) {
	// 	const body = req.body;
	// 	const newCourseRequest = new Course({
	// 		name: body.name,
	// 		description: body.description
	// 	} as any);
	// 	newCourseRequest.save();
    //     res.json(newCourseRequest);
    // }

    // public async update(req: Request, res: Response) {
    //     const id = req.params.courseId;
	// 	const body = req.body;
    //     const response = await Course.update({ _id: id }, body);
    //     res.json(response);
    // }

    // public async delete(req: Request, res: Response) {
    //     const id = req.params.courseId;
    //     const response = await Course.update({ _id: id }, { archive: true });
    //     res.json(response);
    // }
}