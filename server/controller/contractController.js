const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const { Users } = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

module.exports = {
	//서버 계정에 1이더 보내는 핸들러
	faucet: async (req, res) => {
		try {
			//DB에서 admin 계정 address 조회
			const admin = await Users.findOne({
				attributes: ["address"],
				where: { user_id: "admin" },
			});
			//지금 사용중인 네트워크의 계정 조회
			const accounts = await web3.eth.getAccounts();
			//트랜잭션 보내기
			let rawTx = await web3.eth.sendTransaction({
				from: accounts[0],
				to: admin.dataValues.address,
				value: "1000000000000000000",
			});

			//트랜잭션이 제대로 생성 되었을 때
			if (rawTx) {
				//서명에 사용할 개인키 등록
				web3.eth.accounts.privateKeyToAccount(env.GANACHE_PRIVATEKEY);

				//트랜잭션에 서명
				let signTx = await web3.eth.accounts.signTransaction(
					{ ...rawTx, gas: 2000000 },
					env.GANACHE_PRIVATEKEY
				);

				//트랜잭션에 서명이 제대로 되었다면
				if (signTx) {
					//서명한 트랜잭션을 전송
					let successTx = await web3.eth.sendSignedTransaction(
						signTx.rawTransaction
					);
					//서명한 트랜잭션 전송이 성공했다면
					if (successTx) {
						res
							.status(200)
							.send({ message: "Serving Succesed", data: successTx });
					} else {
						res
							.status(502)
							.send({ message: "Error: sendSignedTransaction Failed" });
					}
				} else {
					res.status(502).send({ message: "Error: signTransaction Failed" });
				}
			} else {
				res.status(502).send({ message: "Error: sendTransaction Failed" });
			}
		} catch (e) {
			res.status(502).send({ message: "Failed faucet" });
		}
	},

	//서버 계정에 계좌 잔액 조회 핸들러
	getBalance: async (req, res) => {
		//DB에서 admin 계정 조회
		const admin = await Users.findOne({
			attributes: ["address"],
			where: { user_id: "admin" },
		});

		//admin의 address에서 잔액 조회
		const balance = await web3.eth.getBalance(admin.dataValues.address);
		//잔액조회가 성공하면
		if (balance) {
			//wei 단위를 eth 단위로 변경
			const eth = web3.utils.fromWei(balance, "ether");
			res
				.status(200)
				.send({ message: "getBalance Success", balance: eth + " 이더" });
		} else {
			res.status(500).send({ message: "getBalance Failed" });
		}
	},
};
