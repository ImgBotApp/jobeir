import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Jobs = new Schema({
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
  featured: {
    type: Boolean,
    default: false
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
  location: {
    address: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{ type: Number, required: true }]
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
  title: String,
  role: Object
});

Jobs.index({
  company: 'text'
});

Jobs.index({
  location: '2dsphere'
});

Jobs.index({
  title: 'text'
});

Jobs.plugin(timestamps);

export default mongoose.model('Jobs', Jobs);
