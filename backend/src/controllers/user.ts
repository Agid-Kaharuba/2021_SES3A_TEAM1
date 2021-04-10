import { Request, Response } from "express";
import User from "../model/user";

export default class UserController {
    public async getAll(req: Request, res: Response) {
        const users = await User.find();
        res.json(users)
    }
	
    public async login(req: Request, res: Response){
      const {
        username,
        password
      } = req.body;

      console.log(username);

      User.findOne({ username: username }, function(err: Error, userIn: typeof User){
        // @ts-ignore
        if (userIn.checkPassword(password)){
          res.json("woohoo");
        }
        else{
          res.json("womp womp");
        }
      })

    }

    public async create(req: Request, res: Response) {
      const {
        username,
        password
      } = req.body;
      
      const newUserRequest = new User({
        username,
        password
      } as any);
      newUserRequest.save();
          res.json(newUserRequest);
    }
}