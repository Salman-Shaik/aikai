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
    });

    Favorite.findByUsername = async username => {
        return await Favorite.findOne({
            where: {username: username}
        });
    };

    return Favorite;
};

module.exports = favorite;