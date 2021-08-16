import mongoose from 'mongoose';
import User from './user';
import Task from './task';
import Course from './course';

const progressSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: false,
  },
  userId: {
    type: User.schema,
    required: true,
  },
  taskId: {
    type: Task.schema,
    required: true,
  },
  courseId: {
    type: Course.schema,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },

});

export default mongoose.model('Progress', progressSchema);
