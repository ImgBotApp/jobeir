import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Company = new Schema({
  name: { type: String },
  logo: { type: String },
  website: { type: String },
  product: { type: Number },
  locations: { type: String },
  industry: { type: String },
});

export default mongoose.model('Company', Company);