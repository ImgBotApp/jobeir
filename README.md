# 👻 гост звук

An isomorphic React application (WIP)

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
