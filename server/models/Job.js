import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Job = new Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  dateCreated: {
    type: Date,
    default: Date.now
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
        type: { type: String }
      }
    ]
  },
  employmentType: { type: String },
  equityMax: { type: Number },
  equityMin: { type: Number },
  // experience: { type: String },
  // language: { type: String },
  address: {
    city: String,
    country: String,
    postalCode: String,
    street: String,
    province: String,
    hq: {
      type: Boolean,
      default: true
    }
  },
  offerEquity: { type: String },
  receivingEmails: [
    {
      email: {
        type: String,
        lowercase: true,
        trim: true
      }
    }
  ],
  remote: { type: String },
  salaryMax: { type: Number },
  salaryMin: { type: Number },
  // skills: { type: String },
  title: { type: Object }
});

Job.index({
  company: 'text',
  'address.city': 'text'
});

export default mongoose.model('Job', Job);
