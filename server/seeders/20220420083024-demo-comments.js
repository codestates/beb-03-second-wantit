"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        content: "댓글입니다",
        user_id: 1,
        post_id: 1,
      },
      {
        content: "두 번째 댓글입니다",
        user_id: 1,
        post_id: 1,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
