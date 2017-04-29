import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Job = new Schema({
  company: { type: String },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  description: {
    blocks: [
      {
        data: {},
        depth: { type: Number },
        entityRanges: { type: Array },
        inlineStyleRanges: { type: Array },
        key: { type: String },
        text: { type: String },
        type: { type: String },
      },
    ],
  },
  employmentType: { type: String },
  equityMax: { type: Number },
  equityMin: { type: Number },
  // experience: { type: String },
  // language: { type: String },
  locations: { type: String }, // convert to an array
  offerEquity: { type: String },
  receivingEmails: { tyoe: Array },
  remote: { type: String },
  salaryMax: { type: Number },
  salaryMin: { type: Number },
  // skills: { type: String },
  title: { type: Object },
  versionKey: false,
});

export default mongoose.model('Job', Job);
