const KinozalTvApi = require('./api.js');
const fs = require('fs');

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
    }).then(res => {
            console.log(res[0]);
            let fileName = '/tmp/' + res[0].id + '.torrent';
            kinozalTvApi.downloadTorrent(res[0].id).then(
                res => res.pipe(fs.createWriteStream(fileName)).on('finish', resolve(fileName)),
                    err => console.error(err)
            );
        }
    ),
    err => console.error(err)
);
