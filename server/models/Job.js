import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Job = new Schema({
  title: { type: String },
  company: {
    type: String,
    unique: true,
  },
  locations: { type: String },
  salaryMin: { type: Number },
  salaryMax: { type: Number },
  description: { type: String },
  language: { type: String },
  remote: { type: String },
  type: { type: String },
  experience: { type: String },
  education: { type: String },
  skills: { type: String },
});

export default mongoose.model('Job', Job);