const KinozalTvApi = require('./api.js');

const username = '';
const password = '';


let kinozalTvApi = new KinozalTvApi(username, password);
kinozalTvApi.authenticate().then(res => kinozalTvApi.search({
    title : 'The Big Bang 1080p',
    year: '2017'
}).then(console.log));
