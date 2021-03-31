import { Router } from "express";
import Course from "../model/course";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

courseRouter.get("/", (req, res) => {
    res.send("test");
});

export default courseRouter;
