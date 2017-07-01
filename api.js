const fs = require('fs');
const request = require('request').defaults({jar: true});
const cheerio = require('cheerio');
const qs = require('querystring');

const conv = new require('iconv').Iconv('windows-1251', 'utf8');

const urls = {
    main : 'http://kinozal.tv',
    download : 'http://dl.kinozal.tv'
};

const searchParameterMap = {
    title: 's',
    year: 'd'
};

module.exports = module.exports = KinozalTvApi;

function KinozalTvApi(_username, _password) {
    this.username = _username;
    this.password = _password;
}

KinozalTvApi.prototype.authenticate = function () {
    return new Promise((resolve, reject) => {
        request(
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': ('username=' + this.username + '&password=' + this.password + '&returnto=').length
                },
                url: urls.main + '/takelogin.php',
                method: 'POST',
                encoding: 'binary',
                body: 'username=' + this.username + '&password=' + this.password + '&returnto=',
                followAllRedirects: true,
                jar: this.cookie
            }, (err, response, body) => err || response.statusCode !== 200 ? reject(err || 'error: ' + (response || response.statusCode)) : resolve(null)
        )
    });
};


KinozalTvApi.prototype.search = function (parameters) {
    return new Promise((resolve, reject) => {
        let query = {t : 1};
        Object.keys(parameters).filter(key => searchParameterMap.hasOwnProperty(key)).map(key => {
            query[searchParameterMap[key]] = parameters[key]
        });
        request({
            url: urls.main + '/browse.php?' + qs.stringify(query),
            encoding: 'binary',
            jar: this.cookie
        }, (err, response, body) => {
            if (response.statusCode !== 200) {
                reject(new Error('error: ' + response.statusCode));
            } else {
                let $ = cheerio.load(conv.convert(new Buffer(body, 'binary'), { decodeEntities: true }).toString());
                let list = [];
                //console.log($('div#main div.content div.bx2_0 table.t_peer.w100p tbody tr.bg td.nam a').get());
                resolve($('div#main div.content div.bx2_0 table.t_peer.w100p tbody tr.bg td.nam a').map((i,e) => {
                    return {
                        id: parseInt($(e).attr('href').split('=')[1]),
                        url: $(e).attr('href'),
                        title: $(e).html(),
                        size: $(e).parent().next().next().html(),
                        seeds: parseInt($(e).parent().next().next().next().html())
                    }
                }).get());
            }
        })
    })
};

/*KinozalTvApi.prototype.getDetail = function(id) {

 };*/

KinozalTvApi.prototype.downloadTorrent = function (id) {
    return new Promise((resolve, reject) => {
        try {
            let fileName = '/tmp/' + id + '.torrent';
            request({
                url: urls.download + '/download.php?id=' + id,
                followAllRedirects: true,
                jar: this.cookie
            }).pipe(fs.createWriteStream(fileName)).on('close', resolve(fileName));
        } catch (err) {
            reject(err)
        }
    });
};


/**
 *
 * Workaround - https://github.com/cheeriojs/cheerio/issues/866
 */
let cheerio_html = cheerio.prototype.html;

cheerio.prototype.html = function wrapped_html() {
    let result = cheerio_html.apply(this, arguments);

    if (typeof result === 'string') {
        result = result.replace(/&#x([0-9a-f]{1,6});/ig, function (entity, code) {
            code = parseInt(code, 16);

            // don't unescape ascii characters, assuming that all ascii characters
            // are encoded for a good reason
            if (code < 0x80) return entity;

            return String.fromCodePoint(code)
        })
    }

    return result
};
