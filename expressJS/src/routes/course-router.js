import { Router } from "express";
import Course from "../models/course";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

courseRouter.get("/:id", getCourse, (req, res) => {
    res.send(res.course);
});

courseRouter.post("/", async (req, res) => {
    const course = new Course({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newCourse = await course.save()
        res.status(201).json(newCourse);
    } catch (err){
        res.status(400).json({ message: err.message });
    }

});

courseRouter.patch("/", getCourse, (req, res) => {

});

courseRouter.delete("/:id", getCourse, async (req, res) => {
    try {
        await res.course.remove()
        res.json({ message: "deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCourse(req, res, next){
    let course
    try {
        course = await Course.findById(req.params.id);
        if (course == null){
            return res.status(404).json({ message: "Cannot find" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.course = course;
    next();
}

export default courseRouter;
