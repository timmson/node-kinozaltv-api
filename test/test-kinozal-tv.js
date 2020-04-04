const request = require("./mock-request");
const expect = require("chai").expect;
const KinozalTV = require("../index").KinozalTv;
require("mocha");

const username = "test";
const password = "password";
const proxy = "http://192.168.0.2:3128";


describe("KinozalTV", () => {

	let kinozalTV = new KinozalTV(username, password, proxy, request);

	describe("#authenticate", () => {
		it("Should be no errors", async () => {
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
		});
	});

	describe("#getDetail", () => {
		it("Detail should be returned", async () => {
			expect(await kinozalTV.getDetail(1654888)).to.have.property("id").to.equal(1654888);
		});
	});

	describe("#getDownloadStream", () => {
		it("Detail should be returned", () => {
			expect(kinozalTV.getDownloadStream(1654888)).to.equal(1);
		});
	});
});