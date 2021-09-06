import mongoose from 'mongoose';
import Recipe from './recipe';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  archive: {
    type: Boolean,
    required: false,
  },
  userId:{
    type: String,
    required: false,
  }
});

export default mongoose.model('Task', taskSchema);
