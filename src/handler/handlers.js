const {Sequelize} = require('sequelize');

const jwt = require('jsonwebtoken');
const _ = require('lodash');

const loginHandler = async (req, res, User) => {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token) {
        res.status(401);
        res.send("Unauthorized User")
    }
    const {username, password} = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
    await User.validateUser(username, password, res);
};

const registrationHandler = async (req, res, User, Favorite) => {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token) {
        res.status(401);
        res.send("Unauthorized User")
    }
    const {username, password} = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
    const {name, age, explicitFlag} = req.body;
    await User.createUser(username, password, name, age, explicitFlag);
    await User.findByUsername(username);
    await Favorite.create({username});
    return res.send('Sign Up Success!');
}

const favoriteHandler = async (req, res, Favorite) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const {title, id, posterPath} = req.body;
    await Favorite.update(
        {favoritesInfo: Sequelize.fn('array_append', Sequelize.col('favoritesInfo'), `{"title":"${title}","id":${id},"posterPath":"${posterPath}"}`)},
        {where: {username: userName}}
    );
    res.send(`${title} Saved As Favorite Successfully.`);
}

const deleteFavorite = async (req, res, Favorite) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const {id} = req.body;
    const favorites = await Favorite.findByUsername(userName);
    const filteredFavorites = favorites.favoritesInfo.filter(f => f.id !== id);
    await Favorite.update(
        {favoritesInfo: filteredFavorites},
        {where: {username: userName}}
    );
    res.send(`Deleted Favorite Successfully.`);
}

const getFavorites = async (req, res, Favorite) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const FavoritesObj = await Favorite.findByUsername(userName);
    const titles = JSON.stringify(FavoritesObj.favoritesInfo);
    return res.send(titles);
}

const apiKeySetter = (req, res, next) => {
    let cookie = req.cookies.apiKey;
    if (!cookie) {
        res.cookie('apiKey', '8f38dc176aea0ef9cbb167f50a8fc9b2');
    } else {
        console.info("Api Key cookie already exists");
    }
    next();
};

const validateUser = async (req, res, next, User) => {
    let cookie = req.cookies.user;
    if (!!cookie) {
        await User.findByUsername(cookie).then(obj => {
            if (_.isEmpty(obj)) {
                res.clearCookie("user");
                console.info("Cleared User Cookie");
            }
            return obj;
        }).catch(e => {
            res.clearCookie("user");
            console.info("Cleared User Cookie");
            console.warn(e);
        });
    }
    next();
}

const checkFavorites = async (req, res, next, Favorite) => {
    let cookie = req.cookies.user;
    if (!!cookie) {
        try {
            const favorites = await Favorite.findByUsername(cookie);
            if (_.isEmpty(favorites)) {
                await Favorite.create({username: cookie});
                console.info("Default Favorites Created");
            }
        } catch (e) {
            await Favorite.create({username: cookie});
            console.info("Default Favorites Created");
        }

    }
    next();
}

const getExplicitFlag = async (req, res, User) => {
    const username = req.cookies.user;
    const userObj = await User.findByUsername(username);
    if (_.isEmpty(userObj)) {
        return res.send(JSON.stringify({flagStatus: true}));
    }
    const explicitFlag = userObj.explicitFlag;
    res.send(JSON.stringify({flagStatus: explicitFlag}));
}

module.exports = {
    loginHandler,
    apiKeySetter,
    validateUser,
    getExplicitFlag,
    registrationHandler,
    favoriteHandler,
    deleteFavorite,
    getFavorites,
    checkFavorites
}