import User from '../models/User';
import Company from '../models/Company';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/config';
import crypto from 'crypto';

/**
 * Get all Users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send({
      data: { user },
      errors: [],
    });
  });
}

/**
 * Get a single User
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    /**
     * Query for the user
     * Query all companies the user has joined or created
     * Return companies with user
     */
    // Company.findOne({ name: req.params.name }).exec((err, company) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   }
    //   res.json({ company });
    // });

    // We're passing back the user password, make sure to update that... :)
    res.status(200).send({
      data: { user },
      errors: [],
    });
  });
}
/**
 * Update a single User
 * @param req
 * @param res
 * @returns void
 */
export function updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      agreedToValues: true,
    },
    function(err, user) {
      if (err) return res.send(500, { error: err });

      return res.status(200).send({
        data: { user },
        errors: [],
      });
    },
  );
}

/**
 * Register a single User
 * @param req
 * @param res
 * @returns void
 */
export function registerUser(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(202).send({
      data: {},
      errors: [
        {
          error: 'MISSING_EMAIL_OR_PASSWORD',
          message: 'Email and password are required',
        },
      ],
    });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save(err => {
      if (err) {
        return res.status(409).send({
          data: {},
          errors: [
            {
              error: 'USER_ALREADY_EXISTS',
              message: 'A user with that email already exists.',
            },
          ],
        });
      } else {
        const token = jwt.sign(newUser, serverConfig.jwt);

        return res.status(200).send({
          data: {
            token,
            user: req.body,
          },
          errors: [],
        });
      }
    });
  }
}

/**
 * Login a single User
 * @param req
 * @param res
 * @returns void
 */
export function loginUser(req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          data: {},
          errors: [
            {
              error: 'INVALID_EMAIL_OR_PASSWORD',
              message: 'Invalid email or password',
            },
          ],
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (!err && isMatch) {
            const token = jwt.sign(user, serverConfig.jwt);

            res.status(200).send({
              data: {
                isAuthenticated: true,
                id: user._id,
                token,
              },
              errors: [],
            });
          } else {
            res.status(401).send({
              data: {},
              errors: [
                {
                  error: 'INVALID_EMAIL_OR_PASSWORD',
                  message: 'Invalid email or password',
                },
              ],
            });
          }
        });
      }
    },
  );
}

/**
 * Logout a single User
 * @param req
 * @param res
 * @returns void
 */
export function logoutUser(req, res) {
  req.logout();
  res.status(200).send({
    data: [],
    errors: [],
  });
}

/**
 * Check is a user is authentication
 * @param req
 * @param res
 * @returns void
 */
export function checkAuthentication(req, res) {
  res.status(200).send({
    data: {
      isAuthenticated: true,
      id: req.user._id,
    },
    errors: [],
  });
}

/**
 * Send the user an email to reset password
 * @param req
 * @param res
 * @returns void
 */
export function resetPasswordRequest(req, res) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!user) {
      res.status(200).send({
        data: [],
        errors: [],
      });
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;

    user.save(err => {
      if (err) {
        res.status(500).send(err);
      }

      const resetUrl = `https://${req.headers.host}/login/password/${user.resetPasswordToken}`;
      // send them an email with the link
      res.status(200).send({
        data: [{ resetUrl }],
        errors: [],
      });
    });
  });
  // 3. Send them an email wisth token
  // 4. Return success
}

/**
 * Reset the user's password
 * @param req
 * @param res
 * @returns void
 */
export function resetPassword(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    res.status(200).send({
      data: [],
      errors: [
        {
          error: 'PASSWORDS_DO_NOT_MATCH',
          message: 'The provided passwords do not match. Please try again.',
        },
      ],
    });
  }

  User.findOne({
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!user) {
      res.status(401).send({
        data: [],
        errors: [
          {
            error: 'EXPIRED_PASSWORD_RESET_TOKEN',
            message: 'Unable to update password. Please try a new password reset link',
          },
        ],
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save((err, saved) => {
      if (err) {
        res.status(500).send({
          data: {},
          errors: [
            {
              error: 'INTERNAL_SERVER_ERROR',
              message: 'There was an error updating your password',
            },
          ],
        });
      }

      res.status(200).send({
        data: { user: saved },
        errors: [],
      });
    });
  });
}
