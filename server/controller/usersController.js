const { Users } = require("../models");

module.exports = {
	login: async (req, res) => {
		console.log(req.body);
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

	// signup: (req, res) => {},

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
