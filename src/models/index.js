const {Sequelize, DataTypes} = require('sequelize');
const user = require('./User');
const dbUrl = 'postgres://xzlbmyjogcjbdt:4092514ab48d5c29ea855febd18b6e1af8cca14c5a462b3c84f0a6564296b9a2@ec2-3-214-46-194.compute-1.amazonaws.com:5432/d6dauhamfmo6b6';
const sequelize = new Sequelize(dbUrl)

const models = {
    User: user(sequelize, DataTypes)
};

module.exports = {
    sequelize,
    models
}