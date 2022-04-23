const fs = require("fs");
const WantitToken = artifacts.require("WantitToken.sol");

module.exports = function (deployer) {
	console.log("deploy...");
	deployer.deploy(WantitToken).then(() => {
		if (WantitToken._json) {
			fs.writeFileSync(
				"ABI",
				JSON.stringify(WantitToken._json.abi),
				"utf-8",
				(err) => {
					if (err) throw err;
					console.log("ABI Success");
				}
			);
			fs.writeFileSync(
				"ContractAddress",
				WantitToken.address,
				"utf-8",
				(err) => {
					if (err) throw err;
					console.log("Address Success");
				}
			);
		}
	});
};
