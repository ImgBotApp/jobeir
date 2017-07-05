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
import webpack from 'webpack';
import config from '../webpack/webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';

dotenv.load();

const app = new express();

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

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
import { combineReducers } from 'redux';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import Html from '../client/modules/html/containers/Html';
import {
  ReduxAsyncConnect,
  loadOnServer,
  reducer as reduxAsyncConnect
} from 'redux-connect';

// Import required modules
import routes, { routesArray } from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import { geoLookup } from './util/geoLookup';
import apiRoutes from './routes/ApiRoutes.routes';
import oAuthRoutes from './routes/OAuth.routes';
import serverConfig from './config/config';
import passportInit from './config/passport';

// Apply body Parser and server public assets and routes
app.use(compression());
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
app.use(
  '/public/uploads',
  express.static(path.join(__dirname, '../public/uploads'))
);
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
passportInit(passport);
app.use(passport.session());
app.use(
  '/api/v0',
  jwt({ secret: process.env.JWT }).unless({ path: routesArray }),
  apiRoutes
);
app.use(serverConfig.handleNoToken);
app.use(oAuthRoutes);

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  const location = geoLookup(req);
  const store = configureStore(location);

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }

  match(
    { routes, location: req.originalUrl },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end(err);
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

      loadOnServer({ ...renderProps, store, helpers: { req } })
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
          const html = '<!doctype html>' + renderToStaticMarkup(markup);

          res.send(html);
        })
        .catch(error => next(error));
    }
  );
});

// start app
app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`👋  Running on port ${process.env.PORT}`); // eslint-disable-line
  }
});

export default app;
