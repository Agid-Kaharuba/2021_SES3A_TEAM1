import { Request, Response } from 'express';
// import { MongoError } from 'mongodb';
import Course, { CourseType } from '../model/course';
import Progress, { ProgressType } from '../model/progress';
import ResponseService from '../helpers/response';

export default class CourseController {
  public async getAll(req: Request, res: Response) {
    try {
      const { user } = req;
      let courses;
      if (user?.isSupervisor) {
        courses = await Course.find({ archive: { $ne: true } });
      } else {
        courses = await Course.find({ archive: { $ne: true }, assignedEmployees: user?._id });
      }
      ResponseService.successResponse(res, courses);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async getAllWithUser(req: Request, res: Response) {
    try {
      const courses = await Course.find({ archive: { $ne: true }, assignedEmployees: req.params.userId }).populate({
        path: 'tasks',
        populate: { path: 'recipe' },
      }).populate('assignedEmployees');
      ResponseService.successResponse(res, courses);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      // const course: CourseType = {
      //   name: 'Hello',
      //   description: 'Yes',
      //   tasks: [],
      //   assignEmployee: [],
      //   completed: false,
      // };
      const course: CourseType = await Course.findOne({ _id: req.params.courseId }).populate({
        path: 'tasks',
        populate: { path: 'recipe' },
      }).populate('assignedEmployees').populate('floorPlan');

      const progresses: ProgressType[] = await Progress.find({ courseId: req.params.courseId, userId: req?.user?._id });
      const completed = await progresses.filter((progress) => progress.completed === true);
      course.percentageCompleted = (completed.length / course.tasks.length) * 100;
      // if (course.percentageCompleted === 100) {
      //   course.completed = true;
      // }
      // else {
      //   course.completed = false;
      // }
      course.completed = (course.percentageCompleted === 100);
      ResponseService.successResponse(res, course);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  public async create(req: Request, res: Response) {
    const { body } = req;
    const newCourseRequest = new Course({
      name: body.name,
      description: body.description,
      tasks: body.tasks,
      assignedEmployees: body.assignedEmployees,
      dueDate: body.dueDate,
      image: body.image,
      floorPlan: body.floorPlan,
    } as any);
    newCourseRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newCourseRequest);
      }
    });
  }

  public async update(req: Request, res: Response) {
    try {
      const id = req.params.courseId;
      const { body } = req;
      const response = await Course.updateOne({ _id: id }, { $set: { ...body } });
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.courseId;
      const response = await Course.updateOne({ _id: id }, { archive: true });
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  public async submitProgress(req: Request, res: Response) {
    const { body } = req;
    const newProgressRequest = new Progress(body as any);
    newProgressRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newProgressRequest);
      }
    });
  }

  public async getAllProgress(req: Request, res: Response) {
    try {
      const progresses = await Progress.find();
      ResponseService.successResponse(res, progresses);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }
}
