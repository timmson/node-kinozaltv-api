# API for kinozal.tv

## Install

```bash
npm i node-kinozaltv-api
```

## Quick example
```javascript
const KinozalTvApi = require('node-kinozaltv-api');

let kinozalTvApi = new KinozalTvApi('user', 'password');
kinozalTvApi.authenticate().then(res => kinozalTvApi.search({
    title : 'The Big Bang 1080p',
    year: '2017'
}).then(console.log));
```

## Methods


### Authenticate
...


### Search
...


### Download
...