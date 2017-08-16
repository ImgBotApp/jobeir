import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// create the invitation

const Invite = new Schema({
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users'
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  accepted: { type: Boolean, default: false },
  dateSent: { type: Date, default: Date.now },
  dateAccepted: Date,
  token: {
    type: String,
    default: crypto.randomBytes(20).toString('hex')
  },
  expires: { type: Date, default: Date.now() + 36000000 }
});

export default mongoose.model('Invite', Invite);
