const { Users } = require("../models");
const lightwallet = require("eth-lightwallet");
const fs = require("fs");
const { serialize } = require("v8");
const { transfer } = require("./transfer/transfer");

module.exports = {
	//로그인 핸들러
	login: async (req, res) => {
		const { user_id, password } = req.body;
		const user = await Users.findOne({
			attributes: ["id", "user_id", "address"],
			where: { user_id: user_id, password: password },
		});
		try {
			if (!user) {
				res.status(400).send({ data: null, message: "not registered" });
			} else {
				transfer(user.dataValues.address);
				res.status(200).send({ data: user, message: "login" });
			}
		} catch (e) {
			res.status(500).send({ message: "Failed to login" });
			console.error(e);
		}
	},

	//회원가입 핸들러
	signup: async (req, res) => {
		let reqUserId, reqPassword;
		reqUserId = req.body.userId;
		reqPassword = req.body.password;

		// user에서 find로 userName을 찾고,
		Users.findOrCreate({
			where: {
				user_id: reqUserId,
			},
			default: {
				password: reqPassword,
			},
		}).then(([user, created]) => {
			if (!created) {
				// 있으면 있다고 응답
				res.status(409).send("User exists");
				// 없으면 DB에 저장
			} else {
				// 니모닉코드 생성
				let mnemonic;
				mnemonic = lightwallet.keystore.generateRandomSeed();
				// 생성된 니모닉코드와 password로 keyStore, address 생성
				lightwallet.keystore.createVault(
					{
						password: reqPassword,
						seedPhrase: mnemonic,
						hdPathString: "m/0'/0'/0'",
					},
					function (err, ks) {
						ks.keyFromPassword(reqPassword, function (err, pwDerivedKey) {
							ks.generateNewAddress(pwDerivedKey, 1);

							let address = ks.getAddresses().toString();
							let privateKey = ks.exportPrivateKey(address, pwDerivedKey);

							//데이터 베이스 업데이트
							Users.update(
								{
									password: reqPassword,
									address: address,
									privateKey: privateKey,
								},
								{
									where: {
										user_id: reqUserId,
									},
								}
							).then((result) => {
								Users.findOne({
									where: { user_id: reqUserId },
									attributes: ["address"],
								}).then((recipient) => {
									transfer(recipient.dataValues.address);
								});

								res.json({
									address: address,
									privateKey: privateKey,
									message: "성공",
								});
							});
						});
					}
				);
			}
		});
	},

	//회원정보 조회 핸들러
	findById: async (req, res) => {
		// 보여줄 정보: 내가 작성한 글, 댓글
		const user = await Users.findOne({
			where: { user_id: req.query.user_id },
		});
		try {
			if (!user) {
				res.status(400).send({ data: null, message: "You're not logged in" });
			} else {
				const posts = await user.getPosts({});
				const comments = await user.getComments({});
				res.status(200).send({ data: { posts, comments }, message: "login" });
			}
		} catch (e) {
			res.status(500).send({ message: "Failed to find userInfo" });
			console.error(e);
		}
	},
	// 아이디 중복 체크 핸들러
	checkid: async (req, res) => {
		const { user_id } = req.body;
		const checked = await Users.findOne({
			where: { user_id: user_id },
		});
		try {
			if (checked) {
				// 중복 아이디 있음
				return res.status(200).send({ message: "중복" });
			} else if (checked === null) {
				// 중복 아이디 없음
				return res.status(200).send({
					message: "사용가능",
				});
			}
		} catch (e) {
			res.status(500).send({ message: "Failed to check ID " });
		}
	},
};
