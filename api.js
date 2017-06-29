const tr = require('tor-request');
const cheerio = require('cheerio');
const iconv = require('iconv');
const qs = require('querystring');

module.exports = module.exports = KinozalTvApi;

function KinozalTvApi(_username, _password) {
    this.username = _username;
    this.password = _password;
}

KinozalTvApi.prototype.authenticate = function (callback) {
    tr.request({
        url: 'http://kinozal.tv/takelogin.php',
        method: 'POST',
        encoding: 'binary',
        body: 'username=' + this.username + '&password=' + this.password + '&returnto=',
        followAllRedirects: true
    }, (function (err, response, body)  {
        if (response.statusCode !== 200) {
            console.log(response.statusCode);
            //body = new Buffer(body, 'binary');
            //let conv = new iconv.Iconv('windows-1251', 'utf8');
            //console.log(conv.convert(body).toString());
            callback(new Error('error: ' + response.statusCode))
        } else {
            this.cookie = response.headers['set-cookie'];
            callback(null);
        }
    }).bind(this));
};


KinozalTvApi.prototype.search = function (s, callback) {
    let opt1 = {
        headers: {
            'Cookie': this.cookie
        },
        url: 'http://kinozal.tv/browse.php?' + qs.stringify({s: s}),
        encoding: 'binary'
    };
    tr.request(opt1, (function (err, response, body)  {
        //console.log(response.statusCode);
        body = new Buffer(body, 'binary');
        let conv = new iconv.Iconv('windows-1251', 'utf8');
        //console.log(conv.convert(body).toString());
        let $ = cheerio.load(conv.convert(body).toString());
        let list = $('div#main div.content div.bx2_0 table.t_peer.w100p tbody tr.bg td.nam a');
        console.log(list.length);
        Object.keys(list).slice(0, 1).forEach(key => {
            console.log(list[key].attribs.href + ' = ' + list[key].children[0].data);
        });
        callback(null);
    }).bind(this));
};