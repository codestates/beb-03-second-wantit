const { Posts, Likes } = require("../models");

module.exports = {
	// 좋아요 추가 핸들러
	like: async (req, res) => {
		// console.log(req.body);
		const id = req.params.id;
		try {
			/* const liked = await Likes.create({
				user_id,
				post_id,
			}); */
			const post = await Posts.findOne({ where: { id } });
			const like = await Likes.create({
				post,
			});
			// const liked = await post.addLike();
			if (like) {
				res.status(201).send({ message: "Click like button" });
			} else {
				res.status(400).send({ message: "Not click" });
			}
		} catch (e) {
			res.status(500).send({ message: "Error click like button" });
			// console.error(e);
		}
	},
	// 좋아요 취소 핸들러
	deleteLike: async (req, res) => {
		const id = req.params.id;
		try {
			const deleted = await Likes.destroy({
				where: { id },
			});
			if (deleted) {
				res.status(200).send({ message: "Successfully canceled like button" });
			} else {
				res.status(404).send({ message: "Not canceled like button" });
			}
		} catch (e) {
			res.status(500).send("Failed to canceled like button");
			console.error(e);
		}
	},
};
