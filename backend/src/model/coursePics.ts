import mongoose from 'mongoose';

const CourseImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
},
{ collection: 'CoursePics' });
export default mongoose.model('CourseImage', CourseImageSchema);