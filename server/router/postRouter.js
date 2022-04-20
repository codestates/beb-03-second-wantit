const express = require("express");
const router = express.Router();
const {
  postwrite,
  findAll,
  findById,
  update,
  deletePost,
} = require("../controller/postController");

const {
  comments,
  updateComments,
  deleteComments,
} = require("../controller/comControllers");

const { like, deleteLike } = require("../controller/likeControllers");

router.post("/", postwrite);

router.get("/", findAll);

router.get("/:id", findById);

router.patch("/:id", update);

router.delete("/:id", deletePost);

router.post("/comments", comments);

router.patch("/comments/:commentsid", updateComments);

router.delete("/comments/:commentsid", deleteComments);

router.post("/likes/:id", like);

router.delete("/likes/:id", deleteLike);

module.exports = router;
