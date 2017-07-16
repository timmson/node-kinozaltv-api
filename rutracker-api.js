const socks = require('socks');
const request = require('request').defaults({jar: true});
const cheerio = require('cheerio');
const qs = require('querystring');

const urls = {
    main: 'https://rutracker.org',
    download: 'http://dl.kinozal.tv'
};

const searchParameterMap = {
    title: 's',
    year: 'd'
};

const conv = new require('iconv').Iconv('windows-1251', 'utf8');

module.exports = module.exports = RutrackerApi;

function RutrackerApi(_username, _password, _socksProxy) {
    this.username = _username;
    this.password = _password;
    this.socksAgent = _socksProxy ? new socks.Agent({proxy: _socksProxy}, true, false) : null;
}

RutrackerApi.prototype.auth = function() {
    return new Promise((resolve, reject) => {
        request(
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': ('login_username=' + this.username + '&login_password=' + this.password+ '&login=submit').length
                },
                url: urls.main + '/forum/login.php',
                method: 'POST',
                encoding: 'binary',
                body: 'login_username=' + this.username + '&login_password=' + this.password + '&login=Вход',
                followAllRedirects: true,
                jar: this.cookie,
                agent: this.socksAgent
            }, (err, response, body) => {
                this.socksAgent.encryptedSocket.end();
                err || response.statusCode !== 200 ? reject(err || 'error: ' + (response || response.statusCode)) : resolve(conv.convert(new Buffer(body, 'binary'), {decodeEntities : true }).toString());
            }
        )
    });
};

RutrackerApi.prototype.search = function(parameters) {

};