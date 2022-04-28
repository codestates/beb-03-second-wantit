const { Users, Posts, Likes } = require("../models");
const { transfer } = require("./transfer/transfer");

module.exports = {
  //게시글 작성 핸들러
  postwrite: async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const user_id = req.body.user_id;
    console.log(title);
    console.log(body);
    console.log(user_id);
    try {
      const writepost = await Posts.create({
        title,
        body,
        user_id,
      });
      if (writepost) {
        const recipient = await Users.findOne({
          where: { id: user_id },
          attributes: ["address"],
        });
        transfer(recipient.dataValues.address);
        res.status(201).send({ message: "Success write post" });
      } else {
        res.status(400).send({ message: "Failed to write Post" });
      }
    } catch (e) {
      res.status(500).send({ message: "Failed to write Post" });
      console.error(e);
    }
  },

  //전체 게시글 조회 핸들러
  findAll: async (req, res) => {
    try {
      const posts = await Posts.findAll();
      if (posts) {
        const data = posts.map((posts) => {
          return {
            id: posts.id,
            title: posts.title,
            body: posts.body,
            createdAt: posts.createdAt,
            user_id: posts.user_id,
          };
        });
        res.status(200).send({ data, message: "Successfully get posts" });
      } else {
        res.status(404).send({ message: "No posts are found" });
      }
    } catch (e) {
      res.status(500).send("Failed to get Posts");
      console.error(e);
    }
  },

  //특정 게시물 조회
  findById: async (req, res) => {
    const id = req.params.id;
    const user_id = req.body.user_id;
    console.log(`📌️${user_id}`);

    try {
      const post = await Posts.findOne({ where: { id } });
      const isLiked = await Likes.count({ where: { user_id, post_id: id } });

      if (post) {
        const comments = await post.getComments({});
        const likes = await post.getLikes({});
        res.status(200).send({
          data: { comments, likes: likes.length, post, isLiked },
          message: "ok",
        });
      } else {
        res.status(404).send({ message: "No post are found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Failed to get Posts" });
      console.error(e);
    }
  },

  //게시글 업데이트 핸들러
  update: async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const id = req.params.id;

    try {
      const updated = await Posts.update(
        {
          title,
          body,
        },
        {
          where: { id },
        }
      );

      if (updated[0] === 1) {
        res.status(201).send({ message: "Successfully updated" });
      } else {
        res.status(404).send({ message: "No posts are found" });
      }
    } catch (e) {
      res.status(500).send("Failed to updated Posts");
      console.error(e);
    }
  },

  //게시글 삭제 핸들러
  deletePost: async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await Posts.destroy({
        where: { id },
      });
      if (deleted) {
        res.status(200).send({ message: "Successfully deleted posts" });
      } else {
        res.status(404).send({ message: "No posts are found" });
      }
    } catch (e) {
      res.status(500).send("Failed to delete Posts");
      console.error(e);
    }
  },
};
