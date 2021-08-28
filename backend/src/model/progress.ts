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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
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
