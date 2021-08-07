import mongoose from "mongoose";
import Recipe from "./recipe";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    recipe: {
        type: Recipe.schema, 
        required: false
    },
    type: {
        type: String,
        required: true
    },
    archive: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('Task', taskSchema);