import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Jobs = new Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  externalLink: String,
  state: {
    type: String,
    default: 'pending',
    index: true,
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
        type: String,
      },
    ],
  },
  employmentType: {
    type: String,
    index: true,
  },
  equity: {
    offer: String,
    min: Number,
    max: Number,
  },
  location: {
    address: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'Point',
      index: true,
    },
    coordinates: [{ type: Number, required: true }],
  },
  published: Date,
  receivingEmails: [
    {
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
  ],
  payment: {},
  remote: String,
  salary: {
    min: Number,
    max: Number,
  },
  title: String,
  role: {
    value: {
      type: String,
      index: true,
    },
    label: {
      type: String,
    },
  },
});

function autopopulate(next) {
  this.populate('company');
  next();
}

Jobs.pre('find', autopopulate);
Jobs.pre('findOne', autopopulate);
Jobs.pre('findOneAndUpdate', autopopulate);

Jobs.index({
  employmentType: 'text',
  state: 'text',
  location: '2dsphere',
  title: 'text',
  role: {
    value: 'text',
  },
});

Jobs.plugin(timestamps);

export default mongoose.model('Jobs', Jobs);
