var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

import mogoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

export default mongoose.model('Account', Account);