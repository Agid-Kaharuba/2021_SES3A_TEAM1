import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
  archive: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model('Ingredient', IngredientSchema);
