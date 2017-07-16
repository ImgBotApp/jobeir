/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import serverConfig from '../../../../server/config/config';

const Html = ({ css, assets, state, content }) => {
  const helmet = Helmet.rewind();
  const attrs = helmet.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {helmet.link.toComponent()}
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <main
          id="app"
          dangerouslySetInnerHTML={{ __html: `<div>${content}</div>` }}
        />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        {Object.keys(assets.javascript)
          .reverse()
          .map(key => <script key={key} src={assets.javascript[key]} />)}
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${serverConfig
            .google.MAPS_API_KEY}&libraries=places`}
        />
      </body>
    </html>
  );
};

export default Html;
