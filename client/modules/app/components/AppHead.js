// @flow

/**
 * This react helmt code is adapted from 
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 * 
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 */
import React from 'react';
import Helmet from 'react-helmet';

const seoURL = path => `https://brotzky.tech/${path}`;

const getMetaTags = ({
  title,
  description,
  url,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter
}) => {
  const metaTags = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    // { itemprop: 'image', content: seoImageURL(_.sample(seoImages.google)) },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@{_brotzky}' },
    { name: 'twitter:title', content: `${title} | Gost Zvuk` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter || '@_brotzky' },
    // {
    //   name: 'twitter:image:src',
    //   content: seoImageURL(_.sample(seoImages.twitter)),
    // },
    { name: 'og:title', content: `${title} | The Meteor Chef` },
    { name: 'og:type', content: contentType },
    { name: 'og:url', content: url },
    // { name: 'og:image', content: seoImageURL(_.sample(seoImages.openGraph)) },
    { name: 'og:description', content: description },
    { name: 'og:site_name', content: '{Site Name}' },
    { name: 'fb:app_id', content: '1271809326248448' }
  ];

  if (published)
    metaTags.push({ name: 'article:published_time', content: published });
  if (updated)
    metaTags.push({ name: 'article:modified_time', content: updated });
  if (category) metaTags.push({ name: 'article:section', content: category });
  if (tags) metaTags.push({ name: 'article:tag', content: tags });

  return metaTags;
};

const AppHead = ({
  title,
  description,
  path,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter
}) => (
  <Helmet
    htmlAttributes={{
      lang: 'en'
    }}
    title={title}
    link={[{ rel: 'canonical', href: seoURL(path) }]}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: seoURL(path),
      published,
      updated,
      category,
      tags,
      twitter
    })}
  />
);

export default AppHead;
