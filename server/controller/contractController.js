const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const lightwallet = require("eth-lightwallet");
const fs = require("fs");

module.exports = {
  faucet: async (req, res) => {
    let privateKey;
    let wallet = await fs.readFileSync("wallet.json").toString();
    let keystore = await lightwallet.keystore.deserialize(wallet);
    let address = await keystore.getAddresses();

    keystore.keyFromPassword("2", function (err, pwDerivedKey) {
      privateKey = keystore.exportPrivateKey(...address, pwDerivedKey);
    });
    console.log(
      web3.eth.accounts.wallet.add({
        privateKey: privateKey,
        address: address[0],
      })
    );

    //   //web3.eth.accounts.signTransaction;
    //   //web3.eth.sendSignedTransaction;
  },
};
