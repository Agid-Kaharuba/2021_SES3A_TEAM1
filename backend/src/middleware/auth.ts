import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../helpers/config';
import User from '../model/user';
import ResponseService from '../helpers/response';

const SUPERVISOR_TOKEN = 'SUPERVISOR';
const EMPLOYEE_TOKEN = 'EMPLOYEE';

const getAuthToken = (req: Request): string | null => {
  if (
    req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const getUser = async (token: any) => {
  try {
    const payload = jwt.verify(token, `${config.TOKEN_SECRET}`);
    // @ts-ignore
    return await User.findOne({ username: payload.username });
  } catch (err) {
    return undefined;
  }
};

const verifyUser = async (req: Request, res: Response, next: any) => {
  const token = getAuthToken(req);
  //Supervisor
  if (token == SUPERVISOR_TOKEN) {
    // @ts-ignore
    req.user = await User.findOne({ username: "supervisor" });;
    return next();
  }

  //Employee
  if (token == EMPLOYEE_TOKEN) {
    // @ts-ignore
    req.user = await User.findOne({ username: "employee" });;
    return next();
  }

  if (!token) {
    ResponseService.unauthorizedResponse(res, 'Unauthorized - no token found');
  } else {
    const user = await getUser(token);
    // @ts-ignore
    req.token = token;
    // @ts-ignore
    req.user = user;
    if (user !== undefined) {
      next();
    } else {
      ResponseService.unauthorizedResponse(res);
    }
  }
};

export const checkToken = async (req: Request, res: Response, next: any) => {
  await verifyUser(req, res, next);
};
