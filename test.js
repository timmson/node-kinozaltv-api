const KinozalTvApi = require('./api.js');

const username = '';
const password = '';

let kinozalTvApi = new KinozalTvApi(username, password);
kinozalTvApi.authenticate((err) => {

});
kinozalTvApi.search('Theory', (err) => {

});