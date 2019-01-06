const bytes = require("bytes");
const cheerio = require("cheerio");
const qs = require("querystring");
const iconv = require("iconv");
const conv = new iconv.Iconv("windows-1251", "utf8");

const urls = {
    main: "https://rutracker.org"
};

let that = null;

function RuTrackerOrg(_username, _password, _proxy, _request) {
    that = this;
    that.username = _username;
    that.password = _password;
    that.proxy = _proxy;
    that.request = _request.defaults({jar: true});
}

RuTrackerOrg.prototype.authenticate = function () {
    let data = qs.stringify({
        login_username: that.username, login_password: that.password, login: "Вход"
    });
    return new Promise((resolve, reject) =>
        that.request({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": data.length
                },
                url: urls.main + "/forum/login.php",
                method: "POST",
                encoding: "binary",
                body: data,
                followAllRedirects: true,
                proxy: that.proxy
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
    );
};

RuTrackerOrg.prototype.search = function (parameters) {
    let data = qs.stringify({o: 10, s: 2, prev_new: 0, prev_oop: 0, f: -1, pn: "", nm: parameters.title});
    return new Promise((resolve, reject) => {
        that.request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": data.length
            },
            url: urls.main + "/forum/tracker.php?" + qs.stringify({nm: parameters.title}),
            encoding: "binary",
            body: data,
            followAllRedirects: true,
            proxy: that.proxy
        }, (err, response, body) => {
            if (err || response.statusCode !== 200) {
                //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                reject(err || "error: " + (response || response.statusCode))
            } else {
                //console.log(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                let $ = cheerio.load(conv.convert(new Buffer(body, "binary"), {decodeEntities: true}).toString());
                resolve($("#tor-tbl > tbody tr.tCenter td.t-title div.t-title a").map((i, e) => {
                    return {
                        id: parseInt($(e).attr("href").split("=")[1], 10),
                        url: urls.main + "/forum/" + $(e).attr("href"),
                        title: $(e).html(),
                        size: bytes(parseInt($(e).parent().parent().next().next().find("u").html(), 10)),
                        seeds: parseInt($(e).parent().parent().next().next().next().find("u").html(), 10)
                    };
                }).get().sort((a, b) => a.seeds <= b.seeds));

            }
        })
    });
};

RuTrackerOrg.prototype.getDetail = function (id) {
    return new Promise((resolve, reject) => {
        that.request({
            url: urls.main + "/forum/viewtopic.php?" + qs.stringify({t: id}),
            encoding: "binary",
            followAllRedirects: true,
            proxy: that.proxy
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
                    id,
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
};

RuTrackerOrg.prototype.getDownloadStream = function (id) {
    return that.request({
        url: urls.main + "/forum/dl.php?" + qs.stringify({t: id}),
        followAllRedirects: true,
        proxy: that.proxy
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
        result = result.replace(/&#x([0-9a-f]{1,6});/ig, (entity, code) => {
            code = parseInt(code, 16);
            if (code < 0x80) {
                return entity;
            }
            return String.fromCodePoint(code);
        });
    }

    return result;
};

module.exports = RuTrackerOrg;