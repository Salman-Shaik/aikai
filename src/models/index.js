const {Sequelize, DataTypes} = require('sequelize');
const user = require('./User');
const favorite = require('./Favourite');
const watchlist = require('./WatchList');
const dbUrl = process.env.DATABASE_URL;
const sequelize = new Sequelize(dbUrl);

const models = {
    User: user(sequelize, DataTypes),
    Favorite: favorite(sequelize, DataTypes),
    WatchList: watchlist(sequelize,DataTypes),
};

module.exports = {
    sequelize,
    models
}