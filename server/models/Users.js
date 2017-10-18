import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import bcrypt from 'bcrypt';
import { send } from '../mail/mail';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const Users = new Schema({
  avatar: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    enum: ['Organization', 'User', 'Employee'],
    default: 'User'
  },
  provider: {
    type: String,
    default: 'Local'
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  agreedToValues: {
    type: Boolean,
    default: false
  },
  activeCompany: {
    name: {
      type: String,
      trim: true
    },
    displayName: {
      type: String,
      trim: true
    }
  },
  companies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Company'
    }
  ],
  phoneNumber: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  invites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Invite'
    }
  ]
});

function autopopulate(next) {
  this.populate({
    path: 'invites',
    model: 'Invite',
    populate: [
      {
        path: 'company',
        model: 'Company',
        select: 'displayName logo website'
      },
      {
        path: 'creator',
        model: 'Users',
        select: 'firstName lastName email'
      }
    ]
  });

  this.populate({
    path: 'companies',
    model: 'Company',
    populate: {
      path: 'invites',
      model: 'Invite',
      populate: [
        {
          path: 'company',
          model: 'Company',
          select: 'displayName logo website'
        },
        {
          path: 'creator',
          model: 'Users',
          select: 'firstName lastName email'
        }
      ]
    }
  });

  next();
}

Users.pre('find', autopopulate);
Users.pre('findOne', autopopulate);
Users.pre('findOneAndUpdate', autopopulate);

Users.pre('save', function(next) {
  const user = this;

  if (user.isNew) {
    send({
      subject: `👋  Welcome to Jobeir`,
      template: 'Registration',
      user
    });
  }
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

Users.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

Users.plugin(timestamps);

export default mongoose.model('Users', Users);
