import mongoose from "mongoose"

const ProfileImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: Buffer,
    required: true
  }
})
export default mongoose.model('ProfileImage', ProfileImageSchema);