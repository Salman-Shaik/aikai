const {Sequelize, DataTypes} = require('sequelize');
const user = require('./User')
const sequelize = new Sequelize("aikai", "", "",
    {
        logging: console.log,
        dialect: 'postgres'
    }
);

const models = {
    User: user(sequelize, DataTypes)
};

module.exports = {
    sequelize,
    models
}