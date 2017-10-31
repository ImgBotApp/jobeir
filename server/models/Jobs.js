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
  equity: {
    offer: String,
    min: Number,
    max: Number
  },
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
  published: Date,
  receivingEmails: [
    {
      email: {
        type: String,
        lowercase: true,
        trim: true
      }
    }
  ],
  payment: {},
  remote: String,
  salary: {
    min: Number,
    max: Number
  },
  title: String,
  role: Object
});

function autopopulate(next) {
  this.populate('company');
  next();
}

Jobs.pre('find', autopopulate);
Jobs.pre('findOne', autopopulate);
Jobs.pre('findOneAndUpdate', autopopulate);

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
