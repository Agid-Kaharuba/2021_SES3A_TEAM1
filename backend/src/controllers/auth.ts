import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import { MongoError } from 'mongodb';
import config from '../helpers/config';
import ResponseService from '../helpers/response';
import User from '../model/user';

export default class AuthController {
  public async login(req: Request, res: Response) {
    const {
      username,
      password,
    } = req.body;

    User.findOne({ username }, async (err: Error, userIn: typeof User) => {
      if (userIn) {
        // @ts-ignore
        if (await userIn.checkPassword(password)) {
          const jwtPayload = {
            username,
            password,
          };
          const token = jwt.sign(jwtPayload, `${config.TOKEN_SECRET}`, {
            expiresIn: '24h',
          });
          // @ts-ignore
          userIn.password = undefined;
          ResponseService.successResponse(res, { user: userIn, token });
        } else {
          ResponseService.mongoNotFoundResponse(res, 'Username or password is incorrect');
        }
      } else {
        ResponseService.mongoNotFoundResponse(res, 'Username or password is incorrect');
      }
    });
  }

  public async create(req: Request, res: Response) {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      staffid,
      isSupervisor,
    } = req.body;

    const newUserRequest = new User({
      username,
      password,
      firstname,
      lastname,
      email,
      staffid,
      isSupervisor,
    } as any);
    newUserRequest.save((err: any) => {
      if (err) {
        err.code = 11000;
        ResponseService.mongoErrorResponse(res, err, 'Username already exists in the database');
      } else {
        ResponseService.successResponse(res, newUserRequest);
      }
    });
  }
}
