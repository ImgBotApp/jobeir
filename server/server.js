import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import jwt from 'express-jwt';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import IntlWrapper from '../client/modules/intl/containers/IntlWrapper';
import passport from 'passport';
import serialize from 'serialize-javascript';

import webpack from 'webpack';
import config from '../webpack/webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import configureStore from '../client/redux/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import Html from '../client/modules/html/containers/Html';

// Import required modules
import routes, { routesArray } from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import apiRoutes from './routes/ApiRoutes.routes';
import oAuthRoutes from './routes/OAuth.routes';
import serverConfig from './config/config';
import passportInit from './config/passport';

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
passportInit(passport);
app.use(Express.static(path.resolve(__dirname, '../build/client')));
app.use(
  '/api/v0',
  jwt({ secret: serverConfig.jwt }).unless({ path: routesArray }),
  apiRoutes,
);
app.use(serverConfig.handleNoToken);
app.use(oAuthRoutes);

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }

  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(err);
    }

    if (redirectLocation) {
      return res.redirect(
        302,
        redirectLocation.pathname + redirectLocation.search,
      );
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const content = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>,
        );

        const styles = styleSheet.getCSS();
        const initialState = store.getState();
        const assets = global.webpackIsomorphicTools.assets();
        const state = `window.__INITIAL_STATE__ = ${serialize(initialState)}`;
        const markup = <Html {...{ styles, assets, state, content }} />;
        const html = '<!doctype html>' + renderToStaticMarkup(markup);

        res.send(html);
      })
      .catch(error => next(error));
  });
});

// start app
app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Running on port ${serverConfig.port}`); // eslint-disable-line
  }
});

export default app;
