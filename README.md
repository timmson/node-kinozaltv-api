# API for torrent-trackers
(former [node-kinozaltv-api](https://www.npmjs.com/package/node-kinozaltv-api))

## Installation

```bash
npm i node-t-tracker
```
Install "Tor" if needed

## Quick example 

### RutrackerOrg
(inspired by [Rutracker API для Node.js](https://github.com/nikityy/Rutracker-API))
```javascript
const RuTrackerOrg = require("node-t-tracker").RuTrackerOrg;

const username = "your_username";
const password = "your_password";

//use for Tor connection
const socksProxy = {
    ipaddress: "localhost",
    port: 9050,
    type: 5
};



let ruTrackerOrg = new RuTrackerOrg(username, password, socksProxy);
RuTrackerOrg.authenticate().then(
    res => ruTrackerOrg.search({title: "The Big Bang 1080p"}).then(console.log, console.error)
);
```

### KinozalTV
```javascript
const KinozalTv = require("node-t-tracker").KinozalTv;

const username = "your_username";
const password = "your_password";

//use for Tor connection
const socksProxy = {
    ipaddress: "localhost",
    port: 9050,
    type: 5
};


let kinozalTv = new KinozalTv(username, password, socksProxy);
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