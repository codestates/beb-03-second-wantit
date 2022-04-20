"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: { name: "user_id", allowNull: false },
        onDelete: "CASCADE",
      });
      Post.hasMany(models.Comments, {
        foreignKey: "post_id",
      });
      Post.hasMany(models.Likes, {
        foreignKey: "post_id",
      });
    }
  }
  Post.init(
    {
      firstName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Post;
};
