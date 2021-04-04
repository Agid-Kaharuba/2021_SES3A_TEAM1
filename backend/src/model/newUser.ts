import mongoose from "mongoose";

const newUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
},
{collection: 'users'})

export default mongoose.model('NewUser', newUserSchema);