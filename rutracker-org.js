const socks = require("socks");
const request = require("request").defaults({jar: true});
const cheerio = require("cheerio");
const qs = require("querystring");
const conv = new require("iconv").Iconv("windows-1251", "utf8");

const urls = {
    main: "https://rutracker.org"
};

function RuTrackerOrg(_username, _password, _socksProxy) {
    this.username = _username;
    this.password = _password;
    this.socksAgent = _socksProxy ? new socks.Agent({proxy: _socksProxy}, true, false) : null;
}

RuTrackerOrg.prototype.authenticate = function () {
    let data = qs.stringify({
        login_username: this.username, login_password: this.password, login: "Вход"
    });
    return new Promise((resolve, reject) => {
        request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": data.length
                },
                url: urls.main + "/forum/login.php",
                method: "POST",
                encoding: "binary",
                body: data,
                followAllRedirects: true,
                agent: this.socksAgent
            }, (err, response, body) => {
                if (err || response.statusCode !== 200) {
                    //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                    reject(err || "error: " + (response || response.statusCode))
                } else {
                    //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString())
                    resolve(null);
                }
            }
        )
    });
};

RuTrackerOrg.prototype.search = function (parameters) {
    let data = qs.stringify({o: 10, s: 2, prev_new: 0, prev_oop: 0, f: -1, pn: "", nm: parameters.title});
    return new Promise((resolve, reject) => {
        request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": data.length
            },
            url: urls.main + "/forum/tracker.php?" + qs.stringify({nm: parameters.title}),
            encoding: "binary",
            body: data,
            followAllRedirects: true,
            agent: this.socksAgent
        }, (err, response, body) => {
            if (err || response.statusCode !== 200) {
                //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                reject(err || "error: " + (response || response.statusCode))
            } else {
                //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                let $ = cheerio.load(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                resolve($("#tor-tbl > tbody tr.tCenter td.t-title div.t-title a").map((i, e) => {
                    return {
                        id: parseInt($(e).attr("href").split("=")[1]),
                        url: urls.main + "/forum/" + $(e).attr("href"),
                        title: $(e).html(),
                        size: bytesToSize(parseInt($(e).parent().parent().next().next().find("u").html())),
                        seeds: parseInt($(e).parent().parent().next().next().next().find("u").html())
                    };
                }).get().sort((a, b) => a.seeds <= b.seeds));

            }
        })
    });
};

RuTrackerOrg.prototype.getDetail = function (id) {
    return new Promise((resolve, reject) => {
        request({
            url: urls.main + "/forum/viewtopic.php?" + qs.stringify({t: id}),
            encoding: "binary",
            followAllRedirects: true,
            agent: this.socksAgent
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                let $ = cheerio.load(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                let div1 = $("table#topic_main tbody[id^=post]").first();
                let div = $(div1).find("td.message div.post_body");
                //console.log($(div1).html());
                let detail = {
                    id: id,
                    url: "?",
                    title: $("html head title").html(),
                    img: $(div).find("var.postImg").attr("title"),
                    description: "",
                    about: "",
                    specs: ""
                };
                resolve(detail);
            }
        });
    });
}

RuTrackerOrg.prototype.getDownloadStream = function (id) {
    return request({
        url: urls.main + "/forum/dl.php?" + qs.stringify({t: id}),
        followAllRedirects: true,
        agent: this.socksAgent
    });
};

/**
 *
 * Workaround - https://github.com/cheeriojs/cheerio/issues/866
 */
let cheerio_html = cheerio.prototype.html;

cheerio.prototype.html = function wrapped_html() {
    let result = cheerio_html.apply(this, arguments);

    if (typeof result === "string") {
        result = result.replace(/&#x([0-9a-f]{1,6});/ig, function (entity, code) {
            code = parseInt(code, 16);

            // don"t unescape ascii characters, assuming that all ascii characters
            // are encoded for a good reason
            if (code < 0x80) return entity;

            return String.fromCodePoint(code)
        })
    }

    return result
};

function bytesToSize(bytes) {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

module.exports = RuTrackerOrg;