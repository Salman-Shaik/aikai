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

const logoutUser = (req, res) => {
    const cookie = req.cookies.user;
    if (!!cookie) {
        res.clearCookie("user");
        return res.send("User Logged Out")
    }
    res.status(400);
    res.send("USER COOKIE NOT FOUND");
}

const registrationHandler = async (req, res, User, Favorite, WatchList) => {
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
    await WatchList.create({username});
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

const checkLists = async (req, res, next, Favorite, WatchList) => {
    let cookie = req.cookies.user;
    if (!!cookie) {
        try {
            const favorites = await Favorite.findByUsername(cookie);
            const watchlist = await WatchList.findByUsername(cookie);
            if (_.isEmpty(favorites)) {
                await Favorite.create({username: cookie});
                console.info("Default Favorites Created");
            }
            if (_.isEmpty(watchlist)) {
                await WatchList.create({username: cookie});
                console.info("Default Favorites Created");
            }
        } catch (e) {
            await Favorite.create({username: cookie});
            console.info("Default Favorites Created");
            await WatchList.create({username: cookie});
            console.info("Default Favorites Created");
        }
    }
    next();
}

const getExplicitFlag = async (req, res, User) => {
    const username = req.cookies.user;
    if (!!username) {
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

const addToWatchList = async (req, res, WatchList) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const {title, id, posterPath} = req.body;
    const show = {"title": title, "id": id, "posterPath": posterPath, "watched": false};
    await WatchList.update(
        {watchlist: Sequelize.fn('array_append', Sequelize.col('watchlist'), JSON.stringify(show))},
        {where: {username: userName}}
    );
    res.send(`${title} Added To WatchList.`);
}

const watchedHandler = async (req, res, WatchList) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const {id} = req.body;
    const watchList = await WatchList.findByUsername(userName);
    const show = watchList.watchlist.find(w => w.id === id);
    show.watched = true;
    const filteredWatchList = watchList.watchlist.filter(f => f.id !== id);
    filteredWatchList.push(show);
    await WatchList.update(
        {watchlist: filteredWatchList},
        {where: {username: userName}}
    );
    res.send(`Removed From Watchlist`);
}

const deleteFromWatchlist = async (req, res, WatchList) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const {id} = req.body;
    const watchList = await WatchList.findByUsername(userName);
    const filteredWatchList = watchList.watchlist.filter(w => w.id !== id);
    await WatchList.update(
        {watchlist: filteredWatchList},
        {where: {username: userName}}
    );
    res.send(`Removed From Watchlist`);
}

const getWatchList = async (req, res, WatchList) => {
    const userName = req.cookies.user;
    if (_.isEmpty(userName)) {
        res.status(401);
        return res.send("User not logged in");
    }
    const watchListObj = await WatchList.findByUsername(userName);
    const titles = JSON.stringify(watchListObj.watchlist);
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
    checkLists,
    logoutUser,
    currentShowSetter,
    addToWatchList,
    watchedHandler,
    deleteFromWatchlist,
    getWatchList
}