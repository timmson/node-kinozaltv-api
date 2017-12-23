/*const KinozalTV = require('./api.js').KinozalTv;

const username = 'test';
const password = 'password';
const socksProxy = {
    ipaddress: 'localhost',
    port: 9050,
    type: 5
};

let kinozalTV = new KinozalTV(username, password, socksProxy);

kinozalTV.getDetail(1526686).then(console.log, console.error);*/

const RuTrackerOrg = require('./api.js').RuTrackerOrg;

const username = 'test';
const password = 'password';
const socksProxy = {
    ipaddress: 'localhost',
    port: 9050,
    type: 5
};

let ruTrackerOrg = new RuTrackerOrg(username, password, socksProxy);
ruTrackerOrg.authenticate().then(
    () => ruTrackerOrg.getDetail(5471813).then(console.log, console.error)
).catch(console.error);


