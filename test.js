const KinozalTV = require('./api.js');
const fs = require('fs');

const username = 'username';
const password = 'password';
const socksProxy = {
    ipaddress: 'localhost',
    port: 9050,
    type: 5
};

let kinozalTV = new KinozalTV(username, password, socksProxy);

kinozalTV.getDetail(1526686).then(console.log, console.error);



