const express = require('express');
const compression = require('compression');
const favicon = require('express-favicon');
const logger = require("morgan");
const path = require('path');
const cookieParser = require("cookie-parser");
const {registrationHandler} = require("./handler/handlers");
const {apiKeySetter} = require("./handler/handlers");
const {loginHandler} = require("./handler/handlers");
const {sequelize, models} = require('./models');

const {User} = models;
const port = process.env.PORT || 8080;

const app = express();

// app.use(favicon(__dirname + '../build/favicon.ico'));
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname, {maxAge: 2592000000}));
app.use(express.static(path.join(__dirname, '../build'), {maxAge: 2592000000}));
app.use(apiKeySetter);

app.get('/health', (req, res) => res.send('ok'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../build', 'index.html')));
app.post('/login', (req, res) => loginHandler(req, res, User))
app.post('/register', (req, res) => registrationHandler(req, res, User))

sequelize.sync().then(() => {
    app.listen(port);
});

console.log('\x1b[33m%s\x1b[0m', `Server is listening to ${port}`);