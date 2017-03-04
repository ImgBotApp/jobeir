import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import jwt from 'express-jwt';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import IntlWrapper from '../client/modules/intl/containers/IntlWrapper';
import passport from 'passport'

import webpack from 'webpack';
import config from '../webpack/webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

// React And Redux Setup
import configureStore from '../client/redux/store';
import { Provider } from 'react-redux';
import React from 'react';
import { render, template } from 'rapscallion';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import styleSheet from 'styled-components/lib/models/StyleSheet';

// Import required modules
import routes, { routesArray } from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/User.routes';
import serverConfig from './config/config';
import passportInit from './config/passport';

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(morgan('dev'));
app.use(passport.initialize());
passportInit(passport);
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(jwt({secret: serverConfig.jwt}).unless({path: routesArray}));
app.use(serverConfig.handleNoToken);

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

app.use('/api/v0', posts);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();
  // console.log(styleSheet.styleSheet.sheet.cssRules);
  // const styles = styleSheet.styleSheet.sheet.cssRules.map(rule => rule.cssText).join('\n')
  // ${<style dangerouslySetInnerHTML={{ __html: styles }} />}
  // console.log(styles);

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return template`
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
      </head>
      <body>
        <div id="root">
          <div>${html}</div>
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production'
    ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>`
    : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = render(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        renderFullPage(initialView, finalState)
          .toStream()
          .pipe(res);
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Running on port ${serverConfig.port}`); // eslint-disable-line
  }
});

export default app;