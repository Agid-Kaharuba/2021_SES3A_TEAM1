import Course from '../model/course';
import Task from '../model/task';
import Recipe from '../model/recipe';
import User from '../model/user';
import mongoose from 'mongoose';

const COURSEID = "123456789123456789123456"

async function masterData() {
    // // if the course doesn't exist we can assume the Recipe and Task wont.

    if (!await Course.findOne({ _id: COURSEID })) {
        let employee;

        let recipe = new Recipe({
            name: "Classic Burger",
            steps: [],
            ingredients: [
                "top_bun",
                "lettuce",
                "sauce",
                "cheese",
                "patty",
                "bottom_bun"
            ],
            category: "Burger"
        } as any);
        await recipe.save();

        let task = new Task({
            name: "Beef Burger",
            description: "The user will need to make the recipe attached",
            recipe: recipe,
            type: "Practice"
        } as any);
        await task.save();

        if (!await User.findOne({ username: "employee" })) {
            employee = new User({
                username: "employee",
                password: "employee",
                firstname: "Big",
                lastname: "Chungus",
                email: "bigchungus@gmail.com",
                staffid: "69696969",
                isSupervisor: false
            } as any);
            await employee.save();
        }

        const course = new Course({
            name: "Burger",
            description: "Test Course",
            tasks: [task],
            assignedEmployees: [employee],
            _id: COURSEID
        } as any);
        await course.save();
    }

    if (!await User.findOne({ username: "supervisor" })) {
        let user = new User({
            username: "supervisor",
            password: "supervisor",
            firstname: "Brendon",
            lastname: "Tong",
            email: "brendonrocks@gmail.com",
            staffid: "13204767",
            isSupervisor: true
        } as any);
        await user.save();
    }
}

export default masterData;

