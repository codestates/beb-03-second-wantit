const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const development = {
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	host: env.HOST,
	dialect: "mysql",
};

const production = {
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	host: env.HOST,
	dialect: "mysql",
};

const test = {
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	host: env.HOST,
	dialect: "mysql",
};

module.exports = { development, production, test };
