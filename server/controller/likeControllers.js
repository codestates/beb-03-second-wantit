const { Posts, Likes } = require("../models");

module.exports = {
	// 좋아요 추가 핸들러
	like: async (req, res) => {
		const { user_id, post_id } = req.body;
		try {
			const liked = await Likes.findOrCreate({
				where: {
					user_id: user_id,
					post_id: post_id,
				},
				defaults: {
					user_id: user_id,
					post_id: post_id,
				},
			});
			if (liked) {
				res.status(204).send({ message: "Click like button" });
			} else {
				res.status(404).send({ message: "Not click" });
			}
		} catch (e) {
			res.status(500).send({ message: "Error click like button" });
			console.error(e);
		}
	},
	// 좋아요 취소 핸들러
	deleteLike: async (req, res) => {
		const id = req.params.id;
		const deleted = await Likes.destroy({
			include: [
				{
					model: Posts,
					attributes: ["id"],
					where: {
						id: id,
					},
				},
			],
			where: { id },
		});
		try {
			if (deleted) {
				res.status(204).send({ message: "Successfully canceled like" });
			} else {
				res.status(404).send({ message: "Not canceled like" });
			}
		} catch (e) {
			res.status(500).send("Failed to canceled like");
			console.error(e);
		}
	},
};
