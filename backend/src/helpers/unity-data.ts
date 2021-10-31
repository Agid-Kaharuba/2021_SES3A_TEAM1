import mongoose from 'mongoose';
import Course from '../model/course';
import Task from '../model/task';
import Recipe from '../model/recipe';
import User from '../model/user';

const COURSEID = '123456789123456789123456';

async function masterData() {
  // // if the course doesn't exist we can assume the Recipe and Task wont.

  if (!await Course.findOne({ _id: COURSEID })) {
    let employee;

    const recipe = new Recipe({
      name: 'Classic Burger',
      steps: [],
      ingredients: [
        'top_bun',
        'lettuce',
        'cheese',
        'patty',
        'bottom_bun',
      ],
      category: 'Burger',
    } as any);
    await recipe.save();

    const task = new Task({
      name: 'Beef Burger',
      description: 'The user will need to make the recipe attached',
      recipe: recipe._id,
      type: 'Practice',
    } as any);
    await task.save();

    employee = await User.findOne({ username: 'employee' });

    if (!employee) {
      employee = new User({
        username: 'matthew',
        password: 'matthew',
        firstname: 'Matthew',
        lastname: 'Barrett',
        email: 'Matthew@gmail.com',
        staffid: '12374642',
        isSupervisor: false,
      } as any);
      await employee.save();
    }

    const course = new Course({
      name: 'Burger',
      description: 'Test Course',
      tasks: [task._id],
      assignedEmployees: [employee._id],
      _id: COURSEID,
    } as any);
    await course.save();
  }

  if (!await User.findOne({ username: 'supervisor' })) {
    const user = new User({
      username: 'supervisor',
      password: 'supervisor',
      firstname: 'Brendon',
      lastname: 'Tong',
      email: 'brendonrocks@gmail.com',
      staffid: '13204767',
      isSupervisor: true,
    } as any);
    await user.save();
  }
}

export default masterData;
