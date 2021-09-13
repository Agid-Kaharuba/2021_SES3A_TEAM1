import { Request, Response } from 'express';
import ProgressModel, { Progress, Tracking, TrackingModel } from '../model/progress';
import CourseModel from '../model/course';
import TaskModel from '../model/task';
import ResponseService from '../helpers/response';

export default class ProgressController {
  public async put(req: Request, res: Response) {
    const body = {
      data: req.body.data,
      userId: req.body.userId,
      taskId: req.body.taskId,
      courseId: req.body.courseId,
      completed: req.body.completed,
      score: req.body.score,
    };
    try {
      const progress = await ProgressModel.findOne({
        userId: req.body.userId,
        taskId: req.body.taskId,
        courseId: req.body.courseId,
      });
      if (progress) {
        const response = await ProgressModel.updateOne({ _id: progress._id }, body);
        ResponseService.successResponse(res, response);
      } else {
        const newProgressRequest = new ProgressModel(body as any);
        newProgressRequest.save((err: any) => {
          if (err) {
            ResponseService.mongoErrorResponse(res, err);
          } else {
            ResponseService.successResponse(res, newProgressRequest);
          }
        });
      }
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async searchProgress(req: Request, res: Response) {
    try {
      const search = await ProgressModel.find({
        $and: [
          { $or: [{ undefined: { $eq: req.query.userId } }, { userId: req.query.userId }] },
          { $or: [{ undefined: { $eq: req.query.taskId } }, { taskId: req.query.taskId }] },
          { $or: [{ undefined: { $eq: req.query.courseId } }, { courseId: req.query.courseId }] },
        ],
      }).populate('userId').populate('taskId').populate('courseId');
      ResponseService.successResponse(res, search);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async userCourseStatistics(req: Request, res: Response) {
    try {
      const course = await CourseModel.findOne({ _id: req.query.courseId });
      const totals = {
        Testing: 0,
        Performance: 0,
        Practice: 0,
      };
      const completed = {
        Testing: 0,
        Performance: 0,
        Practice: 0,
      };
      const tasks = [];
      for (const i in course.tasks) {
        const task = await TaskModel.findOne({ _id: course.tasks[i]._id });
        // @ts-ignore
        totals[task.type]++;
        const progress = await ProgressModel.findOne({
          $and: [
            { userId: req.query.userId },
            { taskId: task._id },
            { courseId: req.query.courseId },
          ],
        });
        if (progress) {
          // @ts-ignore
          completed[task.type]++;
        }
        tasks.push({ task, progress });
      }

      const counts = {
        Testing: (completed.Testing / totals.Testing || 0) * 100,
        Performance: (completed.Performance / totals.Performance || 0) * 100,
        Practice: (completed.Practice / totals.Practice || 0) * 100,
      };

      ResponseService.successResponse(res, { counts, tasks });
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async putTracking(req: Request, res: Response) {
    try {
      let tracking: Tracking = req.body;
      tracking._id = undefined;

      let progress = await ProgressModel.findOne({
        $and: [
          { userId: req.query.userId },
          { taskId: req.query.taskId },
          { courseId: req.query.courseId },
        ],
      });

      let response;
      if (!progress){
        progress = new ProgressModel({
          userId: req.query.userId,
          taskId: req.query.taskId,
          courseId: req.query.courseId,
          completed: false,
          tracking: [tracking]
        });
        response = await progress.save();
      }
      else {
        progress.tracking.push(tracking);
        response = await ProgressModel.updateOne({ _id: progress._id }, { $set: { tracking: progress.tracking } });
      }

      ResponseService.successResponse(res, progress);
    } catch (err) {
      console.log(err);
      ResponseService.mongoErrorResponse(res, err);
    }
  }
}
