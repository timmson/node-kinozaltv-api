const request = require("./mock-request");
const expect = require("chai").expect;
const RuTrackerOrg = require("../index").RuTrackerOrg;

const username = "test";
const password = "password";
const proxy = "http://192.168.0.2:3128";

describe("RutrackerOrg", () => {

    let ruTrackerOrg = new RuTrackerOrg(username, password, proxy, request);

    describe("#authenticate", () => {
        it("Should be no errors", async () => {
            let result = await ruTrackerOrg.authenticate();
            expect(result).to.be.null;
        });
    });

    describe("#search", () => {
        it("5 records should be returned", async () => {
            expect(await ruTrackerOrg.search({title: "The best movie ever"})).to.have.lengthOf(5);
        })
    });

    describe("#getDetail", () => {
        it("Detail should be returned", async () => {
            expect(await ruTrackerOrg.getDetail(1654888)).to.have.property("title").to.equal("The best movie ever");
        })
    });

    describe("#getDownloadStream", () => {
        it("Detail should be returned", () => {
            expect(ruTrackerOrg.getDownloadStream(1654888)).to.equal(1);
        })
    });
});