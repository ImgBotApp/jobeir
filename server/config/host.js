const host = {
  port: process.env.PORT || 8000,
  host: process.env.HOST || 'localhost',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 8000
};

export default host;
