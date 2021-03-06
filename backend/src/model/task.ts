import mongoose from 'mongoose';
import { getEnabledCategories } from 'trace_events';
import Recipe from './recipe';

export interface TaskType {
  
}

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
    ref: 'Recipe',
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
  userId: {
    type: String,
    required: false,
  },
  Category: {
    type: String,
    required: false,
  },  
});

export default mongoose.model('Task', taskSchema);
