# API for kinozal.tv

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ff05731cbb6d42d588ef59dc90d42048)](https://www.codacy.com/app/timmson666/node-kinozaltv-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=timmson/node-kinozaltv-api&amp;utm_campaign=Badge_Grade)

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