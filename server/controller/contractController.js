const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const Accounts = require("web3-eth-accounts");
const accounts = new Accounts("http://localhost:7545");

module.exports = {
	faucet: (req, res) => {
		web3.eth.accounts;
		web3.eth.account.privateKeyToAccount();
		web3.eth.accounts.signTransaction;
		web3.eth.sendSignedTransaction;
	},
};
