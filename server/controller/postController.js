const { Posts } = require("../models");

module.exports = {
  postwrite: (req, res) => {},
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
        res.status(200).send({ message: "No posts are found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Failed to get Posts");
    }
  },
  findById: (req, res) => {},
  update: (req, res) => {},
  deletePost: async (req, res) => {
    const id = req.params.id;
    try {
      const deleted = await Posts.destroy({
        where: { id },
      });
      if (deleted) {
        res.status(200).send({ message: "Successfully deleted posts" });
      } else {
        res.status(200).send({ message: "No posts are found" });
      }
    } catch {
      console.error(e);
      res.status(500).send("Failed to delete Posts");
    }
  },
};
