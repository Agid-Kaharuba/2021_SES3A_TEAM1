import { Request, Response } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

      User.findOne({ username: username }, async function(err: Error, userIn: typeof User){
        // @ts-ignore
        if (await userIn.checkPassword(password)){
          const jwtPayload = {​​​​                          
            userId: username,                          
            password: password                       
          }​​​​; 
          const token = jwt.sign(jwtPayload, `${process.env.TOKEN_SECRET}`, {​​​​                            
            expiresIn: "1h"                        
          }​​​​);
          
          console.log(`Welcome ${username}`);
          res.json(token);
        }
        else{
          console.log(`You're not ${username}`)
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