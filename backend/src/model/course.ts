import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

export default mongoose.model('Course', subscriberSchema);