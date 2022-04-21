const { Posts } = require("../models");

module.exports = {
  postwrite: (req, res) => {},
  findAll: (req, res) => {},
  findById: (req, res) => {},
  update: async (req, res) => {
    let title = req.body.title;
    let body = req.body.body;

    await Posts.update(
      {
        title: title,
        body: body,
      },
      {
        where: { id: 1 },
      }
    )
      .then((result) => {
        res.json({ message: "ok" });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  deletePost: (req, res) => {},
};
