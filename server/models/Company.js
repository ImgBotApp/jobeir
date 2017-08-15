import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
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
      accepted: Boolean,
      dateSent: Date,
      dateAccepted: Date,
      inviteToken: String,
      inviteExpires: Date,
      member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
      }
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
  perks: Array,
  phone: Number,
  product: String,

  size: String,
  website: String
});

Company.plugin(timestamps);

export default mongoose.model('Company', Company);
