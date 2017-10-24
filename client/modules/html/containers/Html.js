// @flow
/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import serverConfig from '../../../../server/config/config';

const Html = (props: {
  css: {},
  assets: Array<string>,
  state: {},
  content: string
}) => {
  const { css, assets, state, content } = props;
  const helmet = Helmet.rewind();
  const attrs = helmet.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {helmet.link.toComponent()}
        <script type="text/javascript" src="https://js.stripe.com/v3/" />
        {Object.keys(assets.styles).length > 0 &&
          Object.keys(assets.styles)
            .reverse()
            .map(key => (
              <link
                rel="stylesheet"
                type="text/css"
                key={key}
                href={assets.styles[key]}
              />
            ))}
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${serverConfig
            .google.MAPS_API_KEY}&libraries=places`}
        />
        <main
          id="app"
          dangerouslySetInnerHTML={{ __html: `<div>${content}</div>` }}
        />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        {Object.keys(assets.javascript)
          .filter(key => key.includes('app') || key.includes('vendor'))
          .reverse()
          .map(key => <script key={key} src={assets.javascript[key]} />)}
      </body>
    </html>
  );
};

export default Html;
