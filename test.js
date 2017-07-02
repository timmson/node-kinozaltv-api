const KinozalTvApi = require('./api.js');

const username = 'username';
const password = 'password';
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
