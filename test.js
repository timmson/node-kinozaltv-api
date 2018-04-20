/*
const KinozalTV = require('./api.js').KinozalTv;

const username = 'test';
const password = 'password';
const proxy = 'http://192.168.0.2:3128';

let kinozalTV = new KinozalTV(username, password, proxy);

kinozalTV.getDetail(1526686).then(console.log, console.error);
*/

const RuTrackerOrg = require('./api.js').RuTrackerOrg;

const username = 'test';
const password = 'password';
const proxy = 'http://192.168.0.2:3128';

let ruTrackerOrg = new RuTrackerOrg(username, password, proxy);
ruTrackerOrg.authenticate().then(
    () => ruTrackerOrg.getDetail(5471813).then(console.log, console.error)
).catch(console.error);


