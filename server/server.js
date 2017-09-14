import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import jwt from 'express-jwt';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import IntlWrapper from '../client/modules/intl/containers/IntlWrapper';
import passport from 'passport';
import serialize from 'serialize-javascript';
import favicon from 'serve-favicon';
import delay from 'express-delay';
import webpack from 'webpack';
import config from '../webpack/webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

dotenv.config();

const app = new express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import configureStore from '../client/redux/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ServerStyleSheet } from 'styled-components';
import Html from '../client/modules/html/containers/Html';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';

// Import required modules
import routes, { routesArray } from '../client/routes';
import geoLookup from './util/geoLookup';
import securityHeaders from './util/securityHeaders';
import { notFound, errorHandler } from './errors/handleErrors';
import apiRoutes from './routes/ApiRoutes.routes';
import oAuthRoutes from './routes/OAuth.routes';
import serverConfig from './config/config';
import passportInit from './config/passport';

if (process.env.NODE_ENV === 'development') {
  // Apply request delay for mroe realistic local test
  app.use(delay(300, 500));
}

// General server config such as cookies, body, favicon, public, session
app.use(compression());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(
  favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico'))
);
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT,
    resave: false,
    saveUninitialized: true
  })
);

// Adding security headers to all requests
app.use(securityHeaders);

// initializating passport
app.use(passport.initialize());
passportInit(passport);
app.use(passport.session());

// handling requests without a token (returning 401)
app.use(serverConfig.handleNoToken);

// Setting up API routes, oAuth routes,
app.use(
  '/api/v0',
  jwt({ secret: process.env.JWT }).unless({ path: routesArray }),
  apiRoutes
);

app.use(oAuthRoutes);

app.use(errorHandler);

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;
const mongooseOptions = {
  useMongoClient: true,
  autoReconnect: true,
  keepAlive: 1,
  connectTimeoutMS: 300000
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, mongooseOptions, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  const location = geoLookup(req);
  const memoryHistory = createMemoryHistory(req.url);
  const initialState = Object.assign({}, location);
  const store = configureStore(memoryHistory, initialState);
  const history = syncHistoryWithStore(memoryHistory, store);

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }

  match(
    { history, routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        return res.status(500).end(error);
      }

      if (redirectLocation) {
        return res.redirect(
          302,
          redirectLocation.pathname + redirectLocation.search
        );
      }

      if (!renderProps) {
        return next();
      }

      loadOnServer({ ...renderProps, store, helpers: { req }, routes })
        .then(() => {
          const sheet = new ServerStyleSheet();
          const content = renderToString(
            sheet.collectStyles(
              <Provider store={store} key="provider">
                <IntlWrapper>
                  <ReduxAsyncConnect {...renderProps} />
                </IntlWrapper>
              </Provider>
            )
          );

          const css = sheet.getStyleTags();
          const initialState = store.getState();
          const assets = global.webpackIsomorphicTools.assets();
          const state = `window.__INITIAL_STATE__ = ${serialize(initialState)}`;
          const markup = <Html {...{ css, assets, state, content }} />;
          const html = `<!doctype html>${renderToStaticMarkup(markup)}`;

          res.send(html);
        })
        .catch(error => next(error));
    }
  );
});

// app.use(notFound);

// start app
app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`👋  Running on port ${process.env.PORT}`); // eslint-disable-line
  }
});

export default app;
