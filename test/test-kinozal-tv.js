const fs = require("fs");
const expect = require("chai").expect;
const KinozalTV = require("../index.js").KinozalTv;

const username = "test";
const password = "password";
const proxy = "http://192.168.0.2:3128";


function request(uri, options, callback) {
    let response = {statusCode: 404};
    let body = "";
    if (typeof options === "function") {
        callback = options;
        options = uri;
        let script = "./test/response/" + "kinozal-tv" + "/" + options.url.split("/").pop().split("?")[0];
        body = fs.readFileSync(script);
        response.statusCode = 200;
    }

    if (callback) {
        callback(null, response, body);
    }
}

request.defaults = function (options, requester) {
    return request;
};

describe("KinozalTV", () => {

    let kinozalTV = new KinozalTV(username, password, proxy, request);

    describe("#authenticate", () => {
        it("Data should be returned", async () => {
            let result = await kinozalTV.authenticate();
            expect(result).to.be.null;
        });
    });

    describe("#top", () => {
        it("10 records should be returned", async () => {
            expect(await kinozalTV.getTop("action")).to.have.lengthOf(10);
        });
    });

    describe("#search", () => {
        it("5 records should be returned", async () => {
            expect(await kinozalTV.search({})).to.have.lengthOf(5);
        })
    });

    describe("#getDetail", () => {
        it("Detail should be returned", async () => {
            expect(await kinozalTV.getDetail(1654888)).to.have.property("id").to.equal(1654888);
        })
    });
});


//kinozalTV.getDetail(1526686).then(console.log, console.error);