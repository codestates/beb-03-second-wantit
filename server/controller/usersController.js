const { Users } = require("../models");
const lightwallet = require("eth-lightwallet");

module.exports = {
  login: (req, res) => {},

  signup: async (req, res) => {
    // 포스트맨에서 userName, password를 넣으면
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
              let keyStore = ks.serialize();

              Users.update(
                {
                  password: reqPassword,
                  address: address,
                  privateKey: mnemonic,
                },
                {
                  where: {
                    user_id: reqUserId,
                  },
                }
              )
                .then((result) => {
                  // 주소를 보여준다
                  res.json({ address: address, mnemonic: mnemonic });
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }
        );
      }
    });
  },

  findById: (req, res) => {},
};
