const watchlist = (sequelize, DataTypes) => {
    const WatchList = sequelize.define('watchlist', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        watchlist: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            unique: false,
            defaultValue: []
        }
    }, {
        timestamps: false,
    });

    WatchList.findByUsername = async username => {
        return await WatchList.findOne({
            where: {username: username}
        });
    };

    return WatchList;
};

module.exports = watchlist;