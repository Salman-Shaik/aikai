const express = require('express');
const compression = require('compression');
const favicon = require('express-favicon');
const logger = require("morgan");
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();
app.use(compression());
// app.use(favicon(__dirname + '../build/favicon.ico'));
app.use(express.static(__dirname, {maxAge: 2592000000}));
app.use(express.static(path.join(__dirname, '../build'), {maxAge: 2592000000}));
app.use(logger("dev"));

app.get('/health', (req, res) => res.send('ok'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../build', 'index.html')));
app.listen(port);

console.log('\x1b[33m%s\x1b[0m', `Server is listening to ${port}`);