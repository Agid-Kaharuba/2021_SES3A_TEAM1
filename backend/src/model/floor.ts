import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinate: {
    type: [Object],
    required: true,
  },
  archive: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model('Floor', floorSchema);
