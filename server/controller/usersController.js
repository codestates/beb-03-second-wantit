const { Users } = require("../models");
const lightwallet = require("eth-lightwallet");

module.exports = {
  //로그인 핸들러
  login: async (req, res) => {
    const user = await Users.findOne({
      where: { user_id: req.body.user_id, password: req.body.password },
    });
    if (!user) {
      res.status(400).send({ data: null, message: "not registered" });
    } else {
      // FIXME: data에 담아 줄 요소
      res.status(200).send({ data: user, message: "login" });
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

  //회원정보 조회 핸들러
  findById: async (req, res) => {
    // 보여줄 정보: 내가 작성한 글, 댓글, (좋아요)
    const user = await Users.findOne({ where: { user_id: req.query.user_id } });
    if (!user) {
      res.status(400).send({ data: null, message: "You're not logged in" });
    } else {
      const posts = await user.getPosts({});
      const comments = await user.getComments({});
      res.status(200).send({ data: { posts, comments }, message: "login" });
    }
  },
};
