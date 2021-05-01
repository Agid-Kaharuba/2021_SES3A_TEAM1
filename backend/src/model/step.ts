import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    archive: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('Step', stepSchema);