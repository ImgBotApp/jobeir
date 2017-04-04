import User from '../models/User';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/config';

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

    res
      .status(200)
      .send({
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
    
    res
      .status(200)
      .send({
        data: { user },
        errors: [],
      });
  });
}

/**
 * Register a single User
 * @param req
 * @param res
 * @returns void
 */
export function registerUser(req, res) {
  if (!req.body.email || !req.body.password) {
    return res
      .status(202)
      .send({
        data: {},
        errors: [{
          error: "MISSING_EMAIL_OR_PASSWORD",
          message:'Email and password are required'
        }],
      });
  } else {
    const newUser = new User ({
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save(err => {
      if (err) {
        return res
          .status(409)
          .send({
            data: {},
            errors: [{
              error: "USER_ALREADY_EXISTS",
              message: "A user with that email already exists."
            }],
          });
      } else {
        const token = jwt.sign(newUser, serverConfig.jwt);

        return res
          .status(200)
          .send({
            data: {
              token,
              user: req.body
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
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res
        .status(401)
        .send({
          data: {},
          errors: [{
            error: "INVALID_EMAIL_OR_PASSWORD",
            message:'Invalid email or password'
          }],
        });
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!err && isMatch) {
          const token = jwt.sign(user._id, serverConfig.jwt);

          res
            .status(200)
            .send({
              data: {
                isAuthenticated: true,
                id: user._id,
                token
              },
              errors: []
            });
        } else {
          res
          .status(401)
          .send({
            data: {},
            errors: [{
              error: "INVALID_EMAIL_OR_PASSWORD",
              message:'Invalid email or password'
            }],
          });
        }
      });
    }
  });
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
    errors: []
  });
}