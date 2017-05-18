import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Image = new Schema({
  path: {
    type: String,
    required: true,
    trim: true,
  },
  originalname: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Image', Image);
