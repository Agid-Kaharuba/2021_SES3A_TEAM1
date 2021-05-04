import { Request, Response } from "express";
import Progress from "../model/progress";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";
import progress from "../model/progress";

export default class ProgressController {
    public async put(req: Request, res: Response) {
        try {

            const progress = await Progress.findOne({
                userId: req.body.userId,
                taskId: req.body.taskId,
                courseId: req.body.courseId
            })
            const response = await Progress.updateOne({ _id: progress._id }, req.body);
            ResponseService.successResponse(res, response);
        }
        catch (err) {
            console.log(err);
            const body = req.body;
            const newProgressRequest = new Progress({
                data: body.data,
                userId: body.userId,
                taskId: body.taskId,
                courseId: body.courseId,
                completed: body.completed,
                score: body.score
            } as any);
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