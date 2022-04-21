"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.Users, {
        foreignKey: { name: "user_id", allowNull: false },
        onDelete: "CASCADE",
      });
      Likes.belongsTo(models.Posts, {
        foreignKey: { name: "post_id", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  Likes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
