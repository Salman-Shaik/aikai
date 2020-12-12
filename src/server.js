const express = require("express");
const compression = require("compression");
const favicon = require("express-favicon");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  validateUser,
  currentShowSetter,
  apiKeySetter,
} = require("./handlers/middleware");
const {
  getFavorites,
  getWatchList,
  getExplicitFlag,
  getLanguages,
} = require("./handlers/getHandler");
const {
  favoriteHandler,
  watchedHandler,
  addToWatchList,
} = require("./handlers/putHandler");
const {
  loginHandler,
  registrationHandler,
  mobileLoginHandler,
} = require("./handlers/postHandler");
const {
  deleteFavorite,
  deleteFromWatchlist,
  logoutUser,
} = require("./handlers/deleteHandler");
const { sequelize, models } = require("./models");
const async = require("async");
const { handleReactRoutingRequests } = require("./handlers/getHandler");
const { updateUserDetails } = require("./handlers/putHandler");
const { getUserDetails } = require("./handlers/getHandler");

const cors = require("cors");

const { User } = models;
const port = process.env.PORT || 8080;

const app = express();

const userValidator = (req, res, next) => validateUser(req, res, next, User);

const parallel = (middlewares) => {
  return (req, res, next) => {
    async.each(
      middlewares,
      (mw, cb) => {
        mw(req, res, cb);
      },
      next
    );
  };
};

app.use(cors());
app.use(compression());
app.use(
  express.static(path.join(__dirname, "../build"), { maxAge: 31540000000 })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  parallel([logger("dev"), apiKeySetter, currentShowSetter, userValidator])
);
app.use(favicon(__dirname + "../build/favicon.ico"));

app.get("/health", (req, res) => res.send("ok"));
app.get("/favorites", (req, res) => getFavorites(req, res, User));
app.get("/watchlist", (req, res) => getWatchList(req, res, User));
app.get("/languages", (req, res) => getLanguages(req, res, User));
app.get("/explicitFlag", (req, res) => getExplicitFlag(req, res, User));
app.get("/user_details", (req, res) => getUserDetails(req, res, User));
app.get("/*", handleReactRoutingRequests);

app.post("/login", (req, res) => loginHandler(req, res, User));
app.post("/mobile/login", (req, res) => mobileLoginHandler(req, res, User));
app.post("/register", (req, res) => registrationHandler(req, res, User));

app.put("/favorite", (req, res) => favoriteHandler(req, res, User));
app.put("/watch", (req, res) => addToWatchList(req, res, User));
app.put("/watched", (req, res) => watchedHandler(req, res, User));
app.put("/details", (req, res) => updateUserDetails(req, res, User));

app.delete("/favorite", (req, res) => deleteFavorite(req, res, User));
app.delete("/watch", (req, res) => deleteFromWatchlist(req, res, User));
app.delete("/logout", logoutUser);

sequelize.sync().then(() => {
  app.listen(port);
});

console.log("\x1b[33m%s\x1b[0m", `Server is listening to ${port}`);
