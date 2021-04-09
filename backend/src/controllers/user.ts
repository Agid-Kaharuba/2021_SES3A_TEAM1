import { Request, Response } from "express";
import User from "../model/user";

export default class UserController {
    public async getAll(req: Request, res: Response) {
        const users = await User.find();
        res.json(users)
    }
	
    public async login(req: Request, res: Response){
      const {
        usernameIn,
        passwordIn
      } = req.body;

      User.findOne({ username: usernameIn }, function(err: Error, user: typeof User){
        console.log(err);
        // @ts-ignore
        if (user.checkPassword(passwordIn)){
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