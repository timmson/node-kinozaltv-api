const fs = require("fs");

function request(options, callback) {
    let script = options.url.split("/").pop().split("?")[0];
    if (callback) {
        let bodyPath = options.url.split("?")[0].replace(/https?:\/\//g, "./test/response/");
        let body = fs.readFileSync(bodyPath);
        callback(null, new Object({statusCode: 200}), body);
    }
    return  ["download.php", "dl.php"].includes(script) ? 1 : -1;

}

request.defaults = function (options, requester) {
    return request;
};

module.exports = request;