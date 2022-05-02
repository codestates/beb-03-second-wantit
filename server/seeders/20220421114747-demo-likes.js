"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Likes", [
			{
				user_id: 1,
				post_id: 1,
			},
			{
				user_id: 1,
				post_id: 2,
			},
			{
				user_id: 1,
				post_id: 3,
			},
			{
				user_id: 1,
				post_id: 4,
			},
			{
				user_id: 1,
				post_id: 5,
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Likes", null, {});
	},
};
