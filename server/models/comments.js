"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Users, {
        foreignKey: { name: "user_id", allowNull: false },
        onDelete: "CASCADE",
      });
      Comments.belongsTo(models.Posts, {
        foreignKey: { name: "post_id", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  Comments.init(
    {
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
