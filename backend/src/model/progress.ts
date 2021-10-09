import mongoose, { ObjectId } from 'mongoose';

export interface TrackingType {
  _id?: ObjectId;
  date: Date;
  event: string;
  value: string | number | boolean;
  data?: any;
}

export interface ProgressType {
  data: any;
  userId: string;
  taskId: string;
  courseId: string;
  completed: boolean;
  score: number;
  tracking: TrackingType[];
}

const trackingSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  event: {
    type: String,
  },
  value: {
    type: String,
  },
  data: {
    type: Object,
    required: false,
  },
});

export const TrackingModel = mongoose.model('Tracking', trackingSchema);

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
  tracking: [{
    type: TrackingModel.schema,
    required: false,
  }],
});

export default mongoose.model('Progress', progressSchema);
