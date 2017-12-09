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

const RutrackerOrg = require('./api.js').RutrackerOrg;

const username = 'test';
const password = 'password';
const socksProxy = {
    ipaddress: 'localhost',
    port: 9050,
    type: 5
};

let rutrackerOrg = new RutrackerOrg(username, password, socksProxy);
rutrackerOrg.authenticate().then(
    () => rutrackerOrg.search({title: "test"}).then(console.log, console.error)
).catch(console.error);


