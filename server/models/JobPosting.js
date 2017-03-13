import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const JobPosting = new Schema({
  title: { type: String },
  company: { type: String },
  location: { type: String },
  salary: { type: Number },
  description: { type: String },
  remote: { type: String },
  notifications: { type: String },
  experience: { type: String },
  education: { type: String },
  skills: { type: String },
});

export default mongoose.model('JobPosting', JobPosting);