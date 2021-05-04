import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: false
  },
  userId: {
    type: String,
    required: true
  },
  taskId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  },
  score: {
    type: Number,
    required: false,
    default: 0
  }

});

export default mongoose.model('Progress', progressSchema);