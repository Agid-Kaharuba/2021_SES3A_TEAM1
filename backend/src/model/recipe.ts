import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    steps: {
        type: [String],
        required: false
    },
    ingredients: {
        type: [String],
        required: false
    },
    courseId: {
        type: String,
        required: true
    }
});

export default mongoose.model('Recipe', recipeSchema);