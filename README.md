# API for torrent-trackers
(former [node-kinozaltv-api](https://www.npmjs.com/package/node-kinozaltv-api))

[![status](https://api.travis-ci.org/timmson/node-t-tracker.svg?branch=master)](https://travis-ci.org/timmson/node-t-tracker)
[![codecov](https://codecov.io/gh/timmson/node-t-tracker/branch/master/graph/badge.svg)](https://codecov.io/gh/timmson/node-t-tracker)
[![codacy](https://api.codacy.com/project/badge/Grade/137a008b9b904f9a95a3c1461d2ea6bf)](https://www.codacy.com/app/timmson666/node-t-tracker)
[![version](https://img.shields.io/npm/v/node-t-tracker.svg)](https://www.npmjs.com/package/node-t-tracker)
[![license](https://img.shields.io/npm/l/node-t-tracker.svg)](https://www.npmjs.com/package/node-t-tracker)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftimmson%2Fnode-t-tracker.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftimmson%2Fnode-t-tracker?ref=badge_shield)

## Installation
```bash
npm i node-t-tracker
```
Install "Tor" if needed

## Quick example 

### RutrackerOrg
(inspired by [Rutracker API for Node.js](https://github.com/nikityy/Rutracker-API))
```javascript
const request = require("request");
const RuTrackerOrg = require("node-t-tracker").RuTrackerOrg;

const username = "your_username";
const password = "your_password";

//use for Tor connection
const socksProxy = {
    ipaddress: "localhost",
    port: 9050,
    type: 5
};

let ruTrackerOrg = new RuTrackerOrg(username, password, socksProxy, request);
RuTrackerOrg.authenticate().then(
    res => ruTrackerOrg.search({title: "The Big Bang 1080p"}).then(console.log, console.error)
);
```

### KinozalTV
```javascript
const request = require("request");
const KinozalTv = require("node-t-tracker").KinozalTv;

const username = "your_username";
const password = "your_password";

//use for Tor connection
const socksProxy = {
    ipaddress: "localhost",
    port: 9050,
    type: 5
};


let kinozalTv = new KinozalTv(username, password, socksProxy, request);
kinozalTv.authenticate().then(
    res => kinozalTv.search({
        title: "The Big Bang 1080p",
        year: "2017"
    }).then(console.log, console.error)
);
```

#### Methods


#### Authenticate
...


#### Search
...


#### Download
...