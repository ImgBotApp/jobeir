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
  state: {
    type: String,
    default: 'review'
  },
  description: {
    blocks: [
      {
        data: Object,
        depth: Number,
        entityRanges: Array,
        inlineStyleRanges: Array,
        key: String,
        text: String,
        type: String
      }
    ]
  },
  employmentType: String,
  equityMax: Number,
  equityMin: Number,
  // experience: String,
  // language: String,
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
  offerEquity: String,
  receivingEmails: [
    {
      email: {
        type: String,
        lowercase: true,
        trim: true
      }
    }
  ],
  remote: String,
  salaryMax: Number,
  salaryMin: Number,
  // skills: String,
  title: Object,
  role: Object
});

Job.index({
  company: 'text',
  'address.city': 'text'
});

export default mongoose.model('Job', Job);
