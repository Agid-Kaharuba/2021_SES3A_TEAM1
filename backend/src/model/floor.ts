import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema({
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
