const { Sequelize, DataTypes } = require("sequelize");
const user = require("./User");
const dbUrl = process.env.DATABASE_URL;
console.log(`DB URL: ${dbUrl}`);

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  protocol: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const models = {
  User: user(sequelize, DataTypes),
};

module.exports = {
  sequelize,
  models,
};
