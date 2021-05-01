import { Request, Response } from "express";
import Step from "../model/step";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";

export default class StepController {
    //Get all steps
    public async getAll(req: Request, res: Response) {
        try {
            const steps = await Step.find({ archive: { $ne: true } });
            ResponseService.successResponse(res, steps);
        }
        catch (err) {
            ResponseService.mongoErrorResponse(res, err);
        }
    }

    //Get a Step by name
    public async get(req: Request, res: Response) {
        try {
            const step = await Step.findOne({
                _id: req.params.stepId
            });
            ResponseService.successResponse(res, step);
        }
        catch (err) {
            ResponseService.mongoNotFoundResponse(res, err);
        }
    }

    //Create a Step
    public async create(req: Request, res: Response) {
        const body = req.body;
        const newStepRequest = new Step({
            name: body.name,
            description: body.description
        } as any);
        newStepRequest.save((err: MongoError) => {
			if (err) {
				ResponseService.mongoErrorResponse(res, err);
			} else {
				ResponseService.successResponse(res, newStepRequest);
			}
		});
    }

    //Update a step
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.stepId;
            const body = req.body;
            const response = await Step.updateOne({ _id: id }, body);
            ResponseService.successResponse(res, response);
        }
        catch (err) {
            ResponseService.mongoNotFoundResponse(res, err);
        }
    }

    //Delete a step
    public async delete(req: Request, res: Response){
        try {
            const id = req.params.stepId;
            const response = await Step.updateOne({_id: id}, {archive: true});
            res.json(response);
        }
        catch (err) {
            ResponseService.mongoNotFoundResponse(res, err);
        }
    }
}