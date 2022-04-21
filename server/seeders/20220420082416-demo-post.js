"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        title: "첫 번째 글",
        body: "첫 번째 내용",
        user_id: 1,
      },
      {
        title: "두 번째 글",
        body: "두 번째 내용",
        user_id: 1,
      },
      {
        title: "세 번째 글",
        body: "세 번째 내용",
        user_id: 1,
      },
      {
        title: "네 번째 글",
        body: "네 번째 내용",
        user_id: 1,
      },
      {
        title: "다섯 번째 글",
        body: "다섯 번째 내용",
        user_id: 1,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
