const express = require('express');
const compression = require('compression');
const favicon = require('express-favicon');
const logger = require("morgan");
const path = require('path');
const cookieParser = require("cookie-parser");
const {validateUser, currentShowSetter, apiKeySetter} = require("./handlers/middleware");
const {getFavorites, getWatchList, getExplicitFlag} = require("./handlers/getHandler");
const {favoriteHandler, watchedHandler, addToWatchList} = require("./handlers/putHandler");
const {loginHandler, registrationHandler} = require("./handlers/postHandler");
const {deleteFavorite, deleteFromWatchlist, logoutUser} = require("./handlers/deleteHandler");
const {sequelize, models} = require('./models');

const {User} = models;
const port = process.env.PORT || 8080;

const app = express();

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(apiKeySetter);
app.use((req, res, next) => validateUser(req, res, next, User));
app.use(currentShowSetter)
app.use(express.static(path.join(__dirname, '../build'), {maxAge: 2592000000}));
app.use(favicon(__dirname + '../build/favicon.ico'));

app.get('/health', (req, res) => res.send('ok'));
app.get('/favorites', (req, res) => getFavorites(req, res, User));
app.get('/watchlist', (req, res) => getWatchList(req, res, User));
app.get('/explicitFlag', (req, res) => getExplicitFlag(req, res, User));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../build', 'index.html')));
app.post('/login', (req, res) => loginHandler(req, res, User))
app.post('/register', (req, res) => registrationHandler(req, res, User))
app.put('/favorite', (req, res) => favoriteHandler(req, res, User))
app.put('/watch', (req, res) => addToWatchList(req, res, User))
app.put('/watched', (req, res) => watchedHandler(req, res, User))
app.delete('/favorite', (req, res) => deleteFavorite(req, res, User))
app.delete('/watch', (req, res) => deleteFromWatchlist(req, res, User))
app.delete('/logout', logoutUser);

sequelize.sync().then(() => {
    app.listen(port);
});

console.log('\x1b[33m%s\x1b[0m', `Server is listening to ${port}`);