import { Request, Response } from "express";
import User from "../model/user";

export default class UserController {
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