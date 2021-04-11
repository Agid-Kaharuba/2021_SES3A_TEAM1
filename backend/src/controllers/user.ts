import { Request, Response } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class UserController {
    public async getAll(req: Request, res: Response) {
        const users = await User.find();
        res.json(users)
    }
}