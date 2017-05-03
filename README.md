# 👻 гост звук

An isomorphic React application (WIP)

[![Build Status](https://travis-ci.org/brotzky/gost-zvuk.svg?branch=master)](https://travis-ci.org/brotzky/gost-zvuk)

## Getting Started

```
https://github.com/brotzky/gost-zvuk.git
cd gost-zvuk
yarn
yarn start
```
Requires an instance of MongoDB running locally

### Missing Configuration

There is a missing piece when cloning this repository -- `/server/config/config.js` is missing.
You'll want to create your own private config file.
```
const config = {
  mongoURL: {url},
  port: {port},
  jwt: {key}',
  handleNoToken: {func},
};

export default config;
```

### Running Tests and Prettier

There is a pre-commit hook that will run all tests before each commit. This is to ensure
basic code quality. There is also a lint-staged feature to run prettier on all staged
files. It is recommended you install Prettier on your favourite editor to run on save.

The Prettier config for this repository includes trailing slashes and single quotes.
```
 --single-quote --trailing-comma all --write
```

## The Technology

Currently using
- React
- Redux, Redux Sagas
- Webpack 2
- Node
- MongoDB
- Express
- Rapscillion
- React Reacter 3
- Styled Components
- Jest
