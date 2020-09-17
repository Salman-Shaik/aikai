const user = require('./User');
const favorite = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        favoritesInfo: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            unique: false,
            defaultValue: []
        }
    }, {
        timestamps: false,
    });

    Favorite.findByUsername = async username => {
        return await Favorite.findOne({
            where: {username: username}
        });
    };

    Favorite.belongsTo(user(sequelize, DataTypes))

    return Favorite;
};

module.exports = favorite;