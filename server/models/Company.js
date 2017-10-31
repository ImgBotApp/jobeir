import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  billing: {
    stripe: {
      customer: {},
      card: {}
    }
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  jobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Jobs'
    }
  ],
  members: [
    {
      dateAdded: { type: Date, default: Date.now },
      member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
      }
    }
  ],
  invites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Invite'
    }
  ],
  locations: [
    {
      address: {
        type: Object,
        required: true
      },
      hq: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [{ type: Number, required: true }]
    }
  ],
  logo: String,
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  phone: Number,
  product: String,
  size: String,
  website: String
});

function autopopulate(next) {
  this.populate('invites');
  next();
}

Company.pre('find', autopopulate);
Company.pre('findOne', autopopulate);
Company.pre('findOneAndUpdate', autopopulate);

Company.plugin(timestamps);

export default mongoose.model('Company', Company);
