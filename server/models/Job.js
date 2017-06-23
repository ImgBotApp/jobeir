import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

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
  externalLink: String,
  state: {
    type: String,
    default: 'pending'
  },
  descriptionRaw: String,
  description: {
    type: Object,
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
    unit: Number,
    administrative_area_level_1: String,
    country: String,
    postal_code: String,
    route: String,
    locality: String,
    street_number: Number,
    hq: Boolean
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

Job.plugin(timestamps);

export default mongoose.model('Job', Job);
