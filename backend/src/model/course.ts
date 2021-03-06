import mongoose, { ObjectId } from 'mongoose';
import { TaskType } from './task';

export interface CourseType {
  name: string,
  description: string,
  image?: string,
  tasks: ObjectId[] | TaskType[],
  assignedEmployees: ObjectId[],
  archive?: boolean,
  dueDate?: Date,
  _id?: ObjectId,
  completed?: boolean,
  percentageCompleted?: number,
}

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: false,
  }],
  assignedEmployees: [{
    // TODO: When type is User.schema it is causing primary key collision in the seeder
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }],
  archive: {
    type: Boolean,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  floorPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
    required: false,
  },

});

export default mongoose.model('Course', courseSchema);
