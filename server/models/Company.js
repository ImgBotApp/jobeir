import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  // used to internally match
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  // used to display in UI
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
  locations: [
    {
      city: String,
      country: String,
      postalCode: String,
      street: String,
      province: String,
      hq: {
        type: Boolean,
        default: true
      }
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

export default mongoose.model('Company', Company);
