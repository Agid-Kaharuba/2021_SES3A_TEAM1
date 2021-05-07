import { Request, Response } from "express";
import Progress from "../model/progress";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";

export default class ProgressController {
    public async put(req: Request, res: Response) {
        const body = {
            data: req.body.data,
            userId: req.body.userId,
            taskId: req.body.taskId,
            courseId: req.body.courseId,
            completed: req.body.completed,
            score: req.body.score
        }
        try {

            const progress = await Progress.findOne({
                userId: req.body.userId,
                taskId: req.body.taskId,
                courseId: req.body.courseId
            })
            if (progress){
                const response = await Progress.updateOne({ _id: progress._id }, body);
                ResponseService.successResponse(res, response);
            }
            else {
                const newProgressRequest = new Progress(body as any);
                newProgressRequest.save((err: MongoError) => {
                    if (err) {
                        ResponseService.mongoErrorResponse(res, err);
                    }
                    else {
                        ResponseService.successResponse(res, newProgressRequest);
                    }
                })

            }
        }
        catch (err) {
            ResponseService.mongoErrorResponse(res, err);
        }
    }

    public async searchProgress(req: Request, res: Response) {
        try {
            const search = await Progress.find({
                $and: [
                    { $or: [{ undefined: { $eq: req.query.userId } }, { userId: req.query.userId }] },
                    { $or: [{ undefined: { $eq: req.query.taskId } }, { taskId: req.query.taskId }] },
                    { $or: [{ undefined: { $eq: req.query.courseId } }, { courseId: req.query.courseId }] }
                ]
            });
            if (search.length > 0) {
                ResponseService.successResponse(res, search);
            }
            else {
                ResponseService.notFoundResponse(res, "Query Not found");
            }

        }
        catch (err) {
            ResponseService.mongoErrorResponse(res, err);
        }
    }
}