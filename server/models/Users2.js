"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Posts, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Comments, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Likes, {
        foreignKey: "user_id",
      });
    }
  }
  Users.init(
    {
      user_id: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      privateKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
