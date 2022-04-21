"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Likes", [
			{
				content: "첫 번째 좋아요입니다",
				user_id: 1,
				post_id: 1,
			},
			{
				content: "두 번째 좋아요입니다",
				user_id: 1,
				post_id: 1,
			},
			{
				content: "세 번째 좋아요입니다",
				user_id: 1,
				post_id: 2,
			},
			{
				content: "네 번째 좋아요입니다",
				user_id: 1,
				post_id: 2,
			},
			{
				content: "다섯 번째 좋아요입니다",
				user_id: 1,
				post_id: 3,
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Likes", null, {});
	},
};
