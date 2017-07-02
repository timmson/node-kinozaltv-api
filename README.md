# API for kinozal.tv

## Install

```bash
npm i node-kinozaltv-api
```

## Quick example
```javascript
const KinozalTvApi = require('node-kinozaltv-api');

const username = 'username';
const password = 'password';

//use for Tor connection
const socksProxy = {
    ipaddress: 'localhost',
    port: 9050,
    type: 5
};


let kinozalTvApi = new KinozalTvApi(username, password, socksProxy);
kinozalTvApi.authenticate().then(
    res => kinozalTvApi.search({
        title: 'The Big Bang 1080p',
        year: '2017'
    }).then(console.log),
    err => console.error(err)
);
```

## Methods


### Authenticate
...


### Search
...


### Download
...