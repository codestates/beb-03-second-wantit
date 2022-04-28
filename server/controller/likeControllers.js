const { Users, Posts, Likes } = require("../models");
const { transfer } = require("./transfer/transfer");

module.exports = {
  // 좋아요 추가 핸들러
  like: async (req, res) => {
    const id = req.params.id;
    const { user_id } = req.body;

    try {
      const liked = await Likes.findOrCreate({
        where: {
          user_id: user_id,
          post_id: id,
        },
        defaults: {
          user_id: user_id,
          post_id: id,
        },
      });
      if (liked) {
        const recipient = await Users.findOne({
          where: { id: user_id },
          attributes: ["address"],
        });
        transfer(recipient.dataValues.address);
        res.status(200).send({ message: "Click like button" });
      } else {
        res.status(404).send({ message: "Not click" });
      }
    } catch (e) {
      res.status(500).send({ message: "Failed to click like" });
      console.error(e);
    }
  },
  // 좋아요 취소 핸들러
  deleteLike: async (req, res) => {
    const id = req.params.id;
    const { user_id } = req.body;

    const deleted = await Likes.destroy({
      include: [
        {
          model: Posts,
          attributes: ["id"],
          where: {
            id: id,
          },
        },
        {
          model: Users,
          attributes: ["id"],
          where: {
            id: user_id,
          },
        },
      ],
      where: {
        user_id: user_id,
        post_id: id,
      },
    });
    try {
      if (deleted) {
        res.status(200).send({ message: "Successfully canceled like" });
      } else {
        res.status(404).send({ message: "Not canceled like" });
      }
    } catch (e) {
      res.status(500).send("Failed to cancel like");
      console.error(e);
    }
  },
};
