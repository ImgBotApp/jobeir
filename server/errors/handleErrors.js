import mongoose from 'mongoose';

/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
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
Development Error Hanlder
In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
export const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    )
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
  });
};

/*
Production Error Hanlder
No stacktraces are leaked to user
*/
export const productionErrors = (err, req, res, next) => {
  if (err.message === 'INVALID_EMAIL_OR_PASSWORD') {
    return res.status(401).send({
      data: {},
      errors: [
        {
          error: err.message,
          message: 'Invalid email or password'
        }
      ]
    });
  }

  if (err.status === 401) {
    return res.status(401).send({
      data: {},
      errors: [
        {
          error: 'UNAUTHORIZED',
          message: err.message
        }
      ]
    });
  }

  if (err.message === 'UNABLE_TO_FIND_JOBS') {
    res.status(200).send({
      data: {},
      errors: [
        {
          error: 'UNABLE_TO_FIND_JOBS',
          message: 'There was an erroring finding jobs'
        }
      ]
    });
  }

  if (err.message === 'COMPANY_ALREADY_EXISTS') {
    return res.status(200).send({
      data: {},
      errors: [
        {
          error: 'COMPANY_ALREADY_EXISTS',
          message: 'The comapny name already exists'
        }
      ]
    });
  }

  if (err.message === 'USER_ALREADY_ADDED') {
    return res.status(200).send({
      data: {},
      errors: [
        {
          error: 'USER_ALREADY_ADDED',
          message: 'The user has already been invited'
        }
      ]
    });
  }

  if (err.name === 'CastError') {
    return res.status(200).send({
      data: {},
      errors: [
        {
          error: 'UNABLE_TO_FIND_DATA',
          message: 'There was an error processing your request'
        }
      ]
    });
  }

  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log('err');
  console.log(err);

  if (err) {
    return res.status(500).send({
      data: {},
      errors: [
        {
          error: 'INTERNAL_SERVER_ERROR',
          message: 'There was an error processing your request'
        }
      ]
    });
  }

  next();
};
