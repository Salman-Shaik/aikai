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
    const {name} = req.body;
    await User.createUser(username, password, name);
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


module.exports = {
    loginHandler,
    apiKeySetter,
    registrationHandler,
    favoriteHandler,
    getFavorites
}