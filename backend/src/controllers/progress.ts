import { Request, Response } from "express";
import Progress from "../model/progress";
import Course from "../model/course";
import Task from "../model/task";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";
import mongoose from "mongoose";
import { AnyARecord } from "node:dns";

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
            if (progress) {
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
            }).populate("userId").populate("taskId").populate("courseId");
            ResponseService.successResponse(res, search);
        }
        catch (err) {
            ResponseService.mongoErrorResponse(res, err);
        }
    }

    public async userCourseStatistics(req: Request, res: Response) {
        try {
            const course = await Course.findOne({ _id: req.query.courseId });
            const totals = {
                "Testing": 0,
                "Performance": 0,
                "Practice": 0
            }
            const completed = {
                "Testing": 0,
                "Performance": 0,
                "Practice": 0
            }
            const tasks = []
            for (const i in course.tasks) {
                var task = await Task.findOne({ _id: course.tasks[i]._id });
                // @ts-ignore
                totals[task.type]++;
                const progress = await Progress.findOne({
                    $and: [
                        { userId: req.query.userId },
                        { taskId: task._id },
                        { courseId: req.query.courseId }
                    ]
                });
                if (progress){
                    // @ts-ignore
                    completed[task.type]++;
                }
                tasks.push({ task, progress })
            }

            const counts = {
                "Testing": (completed["Testing"]/totals["Testing"] || 0) * 100,
                "Performance": (completed["Performance"]/totals["Performance"] || 0) * 100,
                "Practice": (completed["Practice"]/totals["Practice"] || 0) * 100
            }

            ResponseService.successResponse(res, { counts, tasks });
        }
        catch (err) {
            console.log(err);
            ResponseService.mongoErrorResponse(res, err);
        }
    }
}

// {
//     course: {

//     },
//     completion: {
//         practice: 50,
//         test: 50,
//         perforamnce: 50
//     },
//     task: {

//     }
// }