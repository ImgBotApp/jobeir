import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Organization', 'User', 'Employee'],
    default: 'User',
  },
  provider: {
    type: String,
    default: 'Local',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  companies: {
    created: [
      {
        name: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    joined: [
      {
        name: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
});

User.pre('save', function(next) {
  const user = this;
  if (this.password && (this.isModified('password') || this.isNew)) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

User.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', User);
