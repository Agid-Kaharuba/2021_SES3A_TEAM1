import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../helpers/config';
import User from '../model/user';
import ResponseService from '../helpers/response';

const getAuthToken = (req: Request): string|null => {
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
