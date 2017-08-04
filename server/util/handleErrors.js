export default function(err, req, res) {
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  console.log('FIRED IN HERE');
  /* We log the error internaly */
  logger.error(err);
  console.log(err);

  /* 
     * Remove Error's `stack` property. We don't want 
     * users to see this at the production env 
     */
  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  return res.status(401).send({
    data: {},
    errors: [
      {
        error: 'INVALID_EMAIL_OR_PASSWORD',
        message: 'Invalid email or password'
      }
    ]
  });
}
