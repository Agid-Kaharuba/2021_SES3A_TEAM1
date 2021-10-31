import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import ProgressModel, { ProgressType, TrackingType, TrackingModel } from '../model/progress';
import CourseModel, { CourseType } from '../model/course';
import TaskModel, { TaskType } from '../model/task';
import UserModel from '../model/user';
import ResponseService from '../helpers/response';
import { filter } from 'underscore';
import { ObjectId } from 'mongoose';

const STATIONS = ["GRILL", "KNIFE", "MICROWAVE"];

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
      // Find course according to the fields below.
      const progress = await ProgressModel.findOne({
        userId: req.body.userId,
        taskId: req.body.taskId,
        courseId: req.body.courseId,
      });
      // If it is found then update the progress.
      if (progress) {
        const response = await ProgressModel.updateOne({ _id: progress._id }, body);
        ResponseService.successResponse(res, response);
        // Otherwise create a new progress.
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
      const tracking: TrackingType = req.body;
      tracking._id = undefined;

      let progress = await ProgressModel.findOne({
        $and: [
          { userId: req.query.userId },
          { taskId: req.query.taskId },
          { courseId: req.query.courseId },
        ],
      });

      let response;
      if (!progress) {
        progress = new ProgressModel({
          userId: req.query.userId,
          taskId: req.query.taskId,
          courseId: req.query.courseId,
          completed: false,
          tracking: [tracking],
        });
        response = await progress.save();
      } else {
        progress.tracking.push(tracking);
        response = await ProgressModel.updateOne({ _id: progress._id }, { $set: { tracking: progress.tracking } });
      }

      ResponseService.successResponse(res, progress);
    } catch (err) {
      console.log(err);
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async getTrackingLogs(req: Request, res: Response) {
    const { userId, courseId } = req.query;

    const workBook: XLSX.WorkBook = XLSX.utils.book_new();

    const user = await UserModel.findOne({ _id: userId });
    const course = await CourseModel.findOne({ _id: courseId });

    const json = [];

    json.push({
      'First Name': user.firstname,
      'Last Name': user.lastname,
      Email: user.email,
      'Staff Id': user.staffid,
    });
    json.push({
      Course: course.name,
      'Course Description': course.description,
    });

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Employee & Course');

    for (const i in course.tasks) {
      const task = await TaskModel.findOne({ _id: course.tasks[i]._id });
      const progress = await ProgressModel.findOne({
        $and: [
          { userId },
          { taskId: task._id },
          { courseId },
        ],
      });

      if (progress) {
        const json = progress.tracking.map((tracking: any) => ({
          event: tracking.event,
          value: tracking.value,
          data: JSON.stringify(tracking.data),
        }));

        const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        XLSX.utils.book_append_sheet(workBook, workSheet, `${task.name}`);
      }
    }

    const buffer = XLSX.write(workBook, { bookType: 'xlsx', bookSST: false, type: 'base64' });

    res
      .set('Content-Disposition', 'attachment; filename=' + `${course.name}-${user.staffid}.xlsx`)
      .send(Buffer.from(buffer, 'base64'));
  }

  public async getPerformace(req: Request, res: Response) {
    try {
      const course: CourseType = await CourseModel.findOne({ _id: req.query.courseId }).exec();

      const taskOutcomes = await computeTimedOutcomes(course);

      const ratings = await computeRatings(course, taskOutcomes)

      const recommendedRatings = insertRecommendations(ratings);
      const groupedRecommendedRatings = groupedRecommendations(recommendedRatings);

      ResponseService.successResponse(res, { taskOutcomes, ratings: recommendedRatings, groupsRatings: groupedRecommendedRatings });
    } catch (err) {
      console.log(err);
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async getUserPerformace(req: Request, res: Response) {
    try {
      const courses: CourseType[] = await CourseModel.find({ archive: { $ne: true }, assignedEmployees: req.params.userId }).exec();

      const results = courses.map(async (course) => {
        const taskOutcomes = await computeTimedOutcomes(course);

        const ratings = await computeRatings(course, taskOutcomes)

        const recommendedRatings = insertRecommendations(ratings);
        const groupedRecommendedRatings = groupedRecommendations(recommendedRatings);

        return { taskOutcomes, ratings: recommendedRatings, groupsRatings: groupedRecommendedRatings };
      });

      const performances = await Promise.all(results);
      const overallRecommendation = computeOverallRecommendation(performances, req.params.userId);
      console.log(overallRecommendation);

      const out: any[] = await Promise.all(performances.map(async (course: any) => {
        return await Promise.all(course.taskOutcomes.map(async (taskOutcome: any) => {
          return await computeTaskReport(taskOutcome, req.params.userId);
        }))
      }));

      const arr2d = [].concat(...out);
      const arr1d = [].concat(...arr2d);

      ResponseService.successResponse(res, { performances, recommendation: overallRecommendation, summary: arr1d });
    } catch (err) {
      console.log(err);
      ResponseService.mongoErrorResponse(res, err);
    }
  }
}

const computeTimedOutcomes = async (course: CourseType) => {
  const taskOutcomes: any = [];

  for (const taskId of course.tasks) {
    let stationTimes: { [key: string]: any[] } = convertArrayToObject(STATIONS, () => new Array());
    let stationAvg: { [key: string]: any } = convertArrayToObject(STATIONS, () => 0);

    const taskTracking = await ProgressModel.find({ taskId: taskId, courseId: course._id });

    for (const progress of taskTracking) {
      for (const station of STATIONS) {
        const result = calcTime(progress.tracking, station);
        if (!result)
          break;
        const mins = new Date(result).getMinutes();
        stationTimes[station].push({ userId: progress.userId, time: mins });
      }
    }

    for (const station of STATIONS) {
      const sum = stationTimes[station].reduce((a, b) => a + b.time, 0);
      const avg = (sum / stationTimes[station].length) || 0;
      stationAvg[station] = avg;
    }
    taskOutcomes.push({ taskId: taskId, times: stationTimes, averages: stationAvg });
  }

  return taskOutcomes;
}

const computeRatings = async (course: CourseType, taskOutcomes: any) => {
  const ratings: { [key: string]: number } = course.assignedEmployees.reduce(
    (obj: { [key: string]: number }, employee: ObjectId) => {
      obj[employee.toString()] = 0;
      return obj;
    },
    {}
  );

  for (const taskOutcome of taskOutcomes) {
    for (const station in taskOutcome.times) {
      const times = taskOutcome.times[station];
      const sortedTimes = times.sort((a: any, b: any) => b.time - a.time);

      sortedTimes.map((employee: any, index: number) => ratings[employee.userId] += index);
    }
  }

  const employeesData = await UserModel.find({ _id: { $in: course.assignedEmployees } }).lean();

  const arrayRating = Object.keys(ratings).map((userId) => {
    const user = employeesData.filter((employee: any) => employee._id.toString() === userId)[0];
    return {
      userId,
      user,
      rating: ratings[userId]
    }
  })

  return arrayRating.sort((a, b) => b.rating - a.rating);
}

const insertRecommendations = (ratings: any[]) => {
  const size = ratings.length;
  return ratings.map((rating, index) => {
    return {
      ...rating,
      recommendation: {
        hire: index < size * 0.3,
        fire: index >= size * 0.7,
      }
    }
  })
}

const groupedRecommendations = (ratings: any[]): { Hire: any[], Neutral: any[], Fire: any[] } => {
  const groups: { Hire: any[], Neutral: any[], Fire: any[] } = {
    Hire: [],
    Neutral: [],
    Fire: []
  }

  let count = 1;
  for (const rating of ratings) {
    rating.rank = count;
    count++;
    if (rating.recommendation.hire) {
      groups.Hire.push(rating);
    } else if (rating.recommendation.fire) {
      groups.Fire.push(rating);
    }
    else {
      groups.Neutral.push(rating);
    }
  }

  return groups
}

const convertArrayToObject = (array: string[], initial: any) => {
  const initialValue = {};
  return array.reduce((obj: { [key: string]: any }, item: string) => {
    obj[item] = initial()
    return obj;
  }, initialValue);
};

const calcTime = (events: TrackingType[], eventName: string) => {
  const filtered = events.filter((event: TrackingType) => event.event === eventName);
  if (filtered.length === 0) {
    return null;
  }
  let total: any = 0;
  let prev: Date = filtered[0].date;

  for (const event of filtered) {
    if (event.value == 1) {
      prev = event.date;
    }
    else {
      const diff: any = event.date.valueOf() - prev.valueOf();
      total = total + diff;
    }
  }
  return total;
}

const computeOverallRecommendation = (performances: any, userId: string) => {
  let overallRecommendation = 0;

  performances.map((performance: any) => {
    const recommendation = performance.ratings.find((rating: any) => rating.userId === userId).recommendation;
    if (recommendation.hire) {
      overallRecommendation += 1;
    }
    else if (recommendation.fire) {
      overallRecommendation -= 1;
    }
  })
  if (overallRecommendation > 0) {
    return "Hire";
  }
  if (overallRecommendation < 0) {
    return "Fire";
  }

  return "Neutral";
}

const computeTaskReport = async (task: any, userId: string) => {
  const notes = [];

  for (const station of STATIONS) {
    const average = task.averages[station];
    const userTime = task.times[station].find((x: any) => x.userId == userId);
    if (!userTime) continue;
    if (userTime.time % 4 == 0) {
      const actualTask = await TaskModel.findOne({
        _id: task.taskId,
      });
      notes.push(`Juggles multiple stations in "${actualTask.name}".`);
    }
    if (userTime.time > average && userTime.time % 2 == 0) {
      const actualTask = await TaskModel.findOne({
        _id: task.taskId,
      });
      notes.push(`Best in class in "${actualTask.name}" for ${station.toLowerCase()}.`);
    }
    else if (userTime.time > average) {
      const actualTask = await TaskModel.findOne({
        _id: task.taskId,
      });
      notes.push(`Above average in "${actualTask.name}" for ${station.toLowerCase()}.`);
    }
    else if (userTime.time > average) {
      const actualTask = await TaskModel.findOne({
        _id: task.taskId,
      });
      notes.push(`Below average in "${actualTask.name}" for ${station.toLowerCase()}.`);
    }
  }

  return notes;
}