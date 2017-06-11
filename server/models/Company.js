import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  // used to internally match
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  // used to display in UI
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  size: String,
  logo: String,
  website: String,
  perks: Array,
  product: String,
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
  phone: Number,
  jobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Jobs'
    }
  ]
});

export default mongoose.model('Company', Company);
