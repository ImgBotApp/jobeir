import Users from '../models/Users';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { send } from '../mail/mail';
import * as err from '../errors/types';

/**
 * Get all Users
 * @param req
 * @param res
 * @returns void
 */
export const getUsers = async (req, res) => {
  const users = await Users.find().sort('-dateAdded');
  if (!users) throw Error(err.ERROR_FINDING_USERS);

  res.status(200).send({
    data: { users },
    errors: []
  });
};

/**
 * Get a single User
 * @param req
 * @param res
 * @returns void
 */
export const getUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (!user) throw Error(err.ERROR_FINDING_USER);

  return res.status(200).send({
    data: { user },
    errors: []
  });
};

/**
 * Update a single User
 * @param req
 * @param res
 * @returns void
 */
export const updateUser = async (req, res) => {
  const values = req.body;

  const user = await Users.findOneAndUpdate(
    { _id: req.params.id },
    { ...values },
    { new: true }
  );
  if (!user) throw Error(err.ERROR_UPDATING_USER);

  return res.status(200).send({
    data: { user },
    errors: []
  });
};

/**
 * Register a single User
 * @param req
 * @param res
 * @returns void
 */
export const registerUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw Error(err.ERROR_INVALID_EMAIL_OR_PASSWORDs);
  }

  const user = await new Users(req.body).save();
  if (!user) throw Error(err.ERROR_CREATING_USER);

  const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT);

  return res.status(200).send({
    data: {
      token,
      user
    },
    errors: []
  });
};

/**
 * Login a single User
 * @param req
 * @param res
 * @returns void
 */
export const loginUser = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email }).select(
    '+password'
  );
  if (!user) throw Error(err.ERROR_INVALID_EMAIL_OR_PASSWORD);

  /**
   * comparePassword() method is defined within the Users model so we're not
   * writing out an async process here and instead using the callback already
   * defined.
   */
  user.comparePassword(req.body.password, (error, isMatch) => {
    if (!error && isMatch) {
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT
      );

      return res.status(200).send({
        data: {
          isAuthenticated: true,
          _id: user._id,
          token
        },
        errors: []
      });
    }

    // Have to capture there error within here because it's not an async method
    return res.status(401).send({
      data: {},
      errors: [
        {
          error: err.ERROR_INVALID_EMAIL_OR_PASSWORD,
          message: 'Invalid email or password'
        }
      ]
    });
  });
};

/**
 * Logout a single User
 * @param req
 * @param res
 * @returns void
 */
export function logoutUser(req, res) {
  req.logout();
  return res.status(200).send({
    data: [],
    errors: []
  });
}

/**
 * Check is a user is authentication
 * @param req
 * @param res
 * @returns void
 */
export function checkAuthentication(req, res) {
  return res.status(200).send({
    data: {
      isAuthenticated: true,
      _id: req.user._id
    },
    errors: []
  });
}

/**
 * Send the user an email to reset password
 * @param req
 * @param res
 * @returns void
 */
export const resetPasswordRequest = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });

  /**
   * For security reasons we're not sending back any errors if the user
   * was not found in our database. It's a silent avoidance of the error
   * on purpose.
   */
  if (!user) {
    return res.status(200).send({
      data: [],
      errors: []
    });
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;

  user.save();

  // changing protocol for local testing
  const protocol = req.headers.host.includes('localhost')
    ? 'http://'
    : 'https://';
  const resetUrl = `${protocol}${req.headers
    .host}/password/${user.resetPasswordToken}`;

  // Fire off the password reset email
  send({
    subject: 'Jobeir password reset',
    template: 'PasswordReset',
    user,
    resetUrl
  });

  // send them an email with the link
  return res.status(200).send({
    data: [],
    errors: []
  });
};

/**
 * Reset the user's password
 * @param req
 * @param res
 * @returns void
 */
export const resetPassword = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    throw Error(err.ERROR_PASSWORDS_DO_NOT_MATCH);
  }

  const user = await Users.findOne({
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() }
  }).select('+password');
  if (!user) throw Error(err.ERROR_EXPIRED_PASSWORD_RESET_TOKEN);

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  user.save();

  return res.status(200).send({
    data: { user },
    errors: []
  });
};
