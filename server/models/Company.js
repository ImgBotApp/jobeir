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
  size: { type: String },
  logo: {
    image: {
      type: Buffer,
      contentType: String
    },
    path: {
      type: String,
      required: true,
      trim: true
    },
    originalName: {
      type: String,
      required: true
    }
  },
  website: { type: String },
  product: { type: String },
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
  phone: { type: Number },
  jobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Jobs'
    }
  ]
});

export default mongoose.model('Company', Company);
