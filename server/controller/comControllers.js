const { Comments } = require("../models");

module.exports = {
  comments: async (req, res) => {
    const { user_id, post_id, content } = req.body;
    try {
      await Comments.create({
        user_id,
        post_id,
        content,
      });
      res.status(201).send({ message: "Successfully write comments" });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Failed to write comments" });
    }
  },
  updateComments: async (req, res) => {
    const id = req.params.commentsid;
    const content = req.body.content;
    try {
      const updated = await Comments.update(
        {
          content,
        },
        {
          where: { id },
        }
      );
      if (updated[0] === 1) {
        res.status(200).send({ message: "Successfully update comments" });
      } else {
        res.status(200).send({ message: "No comments are found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Failed to update comments" });
    }
  },
  deleteComments: async (req, res) => {
    const id = req.params.commentsid;
    try {
      const deleted = await Comments.destroy({
        where: {
          id,
        },
      });
      if (deleted) {
        res.status(200).send({ message: "Successfully delete comments" });
      } else {
        res.status(200).send({ message: "No comments are found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Failed to delete comments" });
    }
  },
};
