const {Sequelize, DataTypes} = require('sequelize');
const user = require('./User');
const dbUrl = process.env.DATABASE_URL;
const sequelize = new Sequelize(dbUrl);

const models = {
    User: user(sequelize, DataTypes)
};

module.exports = {
    sequelize,
    models
}