import * as errors from '../errors/types';

/**
 * catchErrors()
 * Catches errors and passes them to our middleware
 * @param {*} fn 
 */
export const catchErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

/*
Not Found Error Handler
If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
export const notFound = (req, res, next) =>
  res.status(404).send({
    data: {},
    errors: [
      {
        error: 'NOT_FOUND',
        message: 'Double check the spelling and method of your request'
      }
    ]
  });

/*
Production Error Hanlder
No stacktraces are leaked to user
*/
export const errorHandler = (err, req, res, next) => {
  switch (err.message) {
    /**
     * Company Errors
     */
    case errors.ERROR_FINDING_COMPANIES:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'Error finding the requested companies'
          }
        ]
      });
    case errors.ERROR_COMPANY_ALREADY_EXISTS:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: `The name already exists. Please try a new one.`
          }
        ]
      });
    case errors.ERROR_CREATING_COMPANY:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error creating your company'
          }
        ]
      });
    case errors.ERROR_FINDING_COMPANY:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error finding your company'
          }
        ]
      });
    case errors.ERROR_UPDATING_COMPANY:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error updating your company'
          }
        ]
      });

    /**
     * Job Errors
     */
    case errors.ERROR_FINDING_JOBS:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error finding the requested jobs'
          }
        ]
      });
    case errors.ERROR_FINDING_JOB:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error finding the requested job'
          }
        ]
      });
    case errors.ERROR_CREATING_JOB:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error creating the requested job'
          }
        ]
      });
    case errors.ERROR_UPDATING_JOB:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error updating the requested job'
          }
        ]
      });
    case errors.ERROR_DELETING_JOB:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error deleting the requested job'
          }
        ]
      });

    /**
     * User errors
     */
    case errors.ERROR_FINDING_USERS:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error finding the requested users'
          }
        ]
      });
    case errors.ERROR_FINDING_USER:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error finding the requested user'
          }
        ]
      });
    case errors.ERROR_CREATING_USER:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error creating the requested user'
          }
        ]
      });
    case errors.ERROR_UPDATING_USER:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error updating the requested user'
          }
        ]
      });
    case errors.ERROR_DELETING_USER:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'There was an error deleting the requested user'
          }
        ]
      });

    /**
     * User & Auth Erorrs
     */
    case errors.ERROR_USER_ALREADY_ADDED:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'Error, user is already part of the company'
          }
        ]
      });
    case errors.ERROR_EXPIRED_PASSWORD_RESET_TOKEN:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'Password reset token has expired. Please try again'
          }
        ]
      });
    case errors.ERROR_PASSWORDS_DO_NOT_MATCH:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'Password do not match'
          }
        ]
      });
    case errors.ERROR_INVALID_EMAIL_OR_PASSWORD:
      return res.status(200).send({
        data: {},
        errors: [
          {
            error: err.message,
            message: 'Invalid email or password'
          }
        ]
      });
    default:
  }

  /**
   * If nothing gets matched within the switch statement we move on
   * to more generic errors handlers
   */

  if (err.name === 'CastError') {
    return res.status(200).send({
      data: {},
      errors: [
        {
          error: errors.ERROR_FINDING_DATA,
          message: 'There was an error processing your request'
        }
      ]
    });
  }

  if (err.status === 401) {
    return res.status(401).send({
      data: {},
      errors: [
        {
          error: errors.ERROR_UNAUTHORIZED,
          message: err.message
        }
      ]
    });
  }

  if (err) {
    return res.status(500).send({
      data: {},
      errors: [
        {
          error: errors.ERROR_INTERNAL_SERVER,
          message: 'There was an error processing your request',
          details: process.env.NODE_ENV === 'production' ? {} : err
        }
      ]
    });
  }

  next();
};
