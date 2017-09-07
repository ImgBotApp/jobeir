// @flow
/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import serverConfig from '../../../../server/config/config';

const Html = (props: {
  css: {},
  assets: Array<string>,
  state: {},
  content: string,
  url: string
}) => {
  const { css, assets, state, content, url } = props;
  const helmet = Helmet.rewind();
  const attrs = helmet.htmlAttributes.toComponent();
  const paths = Object.keys(assets.javascript)
    .reverse()
    .map(key => key.replace(new RegExp('-', 'g'), '/'))
    .filter(
      key => key.includes('app') || key.includes('vendor')
      // url.indexOf(key) !== -1,
    )
    .map(key => key.replace(new RegExp('/', 'g'), '-'));

  console.log(assets.javascript);
  console.log(paths);
  console.log(url);

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
        {paths.map(key => <script key={key} src={assets.javascript[key]} />)}
      </body>
    </html>
  );
};

export default Html;
