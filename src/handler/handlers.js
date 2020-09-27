const {Sequelize} = require('sequelize');
const {decode} = require("js-base64");
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

const logoutUser = (req, res) => {
    const cookie = decode(req.cookies.user);
    if (!!cookie) {
        res.clearCookie("user");
        return res.send("User Logged Out")
    }
    res.status(400);
    res.send("USER COOKIE NOT FOUND");
}

const registrationHandler = async (req, res, User) => {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token) {
        res.status(401);
        res.send("Unauthorized User")
    }
    const {username, password} = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
    const {name, age, explicitFlag} = req.body;
    await User.createUser(username, password, name, age, explicitFlag);
    await User.findByUsername(username);
    return res.send('Sign Up Success!');
}

const favoriteHandler = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const username = decode(cookie);
    const {title, id, posterPath} = req.body;
    await User.update(
        {favorites: Sequelize.fn('array_append', Sequelize.col('favorites'), `{"title":"${title}","id":${id},"posterPath":"${posterPath}"}`)},
        {where: {username}}
    );
    res.send(`${title} Saved As Favorite Successfully.`);
}

const deleteFavorite = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const username = decode(cookie);
    const {id} = req.body;
    const favorites = await User.getFavorites(username);
    const filteredFavorites = favorites.filter(f => f.id !== id);
    await User.update(
        {favorites: filteredFavorites},
        {where: {username}}
    );
    res.send(`Deleted Favorite Successfully.`);
}

const getFavorites = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const username = decode(cookie);
    const FavoritesObj = await User.getFavorites(username)
    const titles = JSON.stringify(FavoritesObj);
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
        await User.findByUsername(decode(cookie)).then(obj => {
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

const getExplicitFlag = async (req, res, User) => {
    let cookie = req.cookies.user;
    if (!!cookie) {
        const username = decode(cookie);
        const userObj = await User.findByUsername(username);
        const explicitFlag = userObj.explicitFlag;
        return res.send(JSON.stringify({flagStatus: explicitFlag}));
    }
    res.send(JSON.stringify({flagStatus: true}));
}

const currentShowSetter = (req, res, next) => {
    const show = req.query.showId;
    const showType = req.query.showType;
    if (!!show && !!showType) {
        res.cookie("showId", show);
        res.cookie("showType", showType);
        res.redirect("/");
    } else {
        res.clearCookie("showId");
        res.clearCookie("showType");
    }
    next();
}

const addToWatchList = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const username = decode(cookie);
    const {title, id, posterPath} = req.body;
    const show = {"title": title, "id": id, "posterPath": posterPath, "watched": false};
    await User.update(
        {watchlist: Sequelize.fn('array_append', Sequelize.col('watchlist'), JSON.stringify(show))},
        {where: {username}}
    );
    res.send(`${title} Added To WatchList.`);
}

const watchedHandler = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    let username = decode(cookie);
    const {id} = req.body;
    const watchList = await User.getWatchList(username);
    const show = watchList.find(w => w.id === id);
    show.watched = true;
    const filteredWatchList = watchList.filter(f => f.id !== id);
    filteredWatchList.push(show);
    await User.update(
        {watchlist: filteredWatchList},
        {where: {username}}
    );
    res.send(`Removed From Watchlist`);
}

const deleteFromWatchlist = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    let username = decode(cookie);
    const {id} = req.body;
    const watchList = await User.getWatchList(username);
    const filteredWatchList = watchList.filter(w => w.id !== id);
    await User.update(
        {watchlist: filteredWatchList},
        {where: {username}}
    );
    res.send(`Removed From Watchlist`);
}

const getWatchList = async (req, res, User) => {
    const cookie = req.cookies.user;
    if (_.isEmpty(cookie)) {
        res.status(401);
        return res.send("User not logged in");
    }
    let username = decode(cookie);
    const watchListObj = await User.getWatchList(username);
    const titles = JSON.stringify(watchListObj);
    return res.send(titles);
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
    logoutUser,
    currentShowSetter,
    addToWatchList,
    watchedHandler,
    deleteFromWatchlist,
    getWatchList
}