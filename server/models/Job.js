import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Job = new Schema({
  title: { type: String },
  company: {
    type: String,
    unique: true,
  },
  location: { type: String },
  salaryRange: { 
    min: { type: Number },
    max: { type: Number},
  },
  description: { type: String },
  language: { type: String },
  remote: { type: String },
  type: { type: String },
  notifications: { type: String },
  experience: { type: String },
  education: { type: String },
  skills: { type: String },
});

export default mongoose.model('Job', Job);