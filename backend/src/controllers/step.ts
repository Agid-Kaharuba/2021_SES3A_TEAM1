import { Request, Response } from "express";
import Step from "../model/step";

export default class StepController {
    //Get all steps
    public async getAll(req: Request, res: Response) {
        const steps = await Step.find({ archive: { $ne: true } });
        res.json(steps);
    }

    //Get a Step by name
    public async getAllByName(req: Request, res: Response) {
        const step = await Step.find({
            name: req.body.name
        });
        res.json(step);
    }

    //Create a Step
    public async create(req: Request, res: Response) {
        const body = req.body;
        const newStepRequest = new Step({
            name: body.name,
            description: body.description
        } as any);
        newStepRequest.save();
        res.json(newStepRequest);
    }

    //Update a step
    public async update(req: Request, res: Response) {
        const id = req.params.stepId;
        const body = req.body;
        const response = await Step.updateOne({ _id: id }, body);
        res.json(response);
    }

    //Delete a step
    public async delete(req: Request, res: Response){
        const id = req.params.stepId;
        const response = await Step.updateOne({_id: id}, {archive: true});
        res.json(response);
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