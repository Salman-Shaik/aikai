const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const { decode } = require("js-base64");

const favoriteHandler = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(cookie);
  const { title, id, posterPath } = req.body;
  await User.update(
    {
      favorites: Sequelize.fn(
        "array_append",
        Sequelize.col("favorites"),
        `{"title":"${title}","id":${id},"posterPath":"${posterPath}"}`
      ),
    },
    { where: { username } }
  );
  res.send(`${title} Saved As Favorite Successfully.`);
};

const mobileFavoriteHandler = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { title, id, posterPath } = req.body;
  await User.update(
    {
      favorites: Sequelize.fn(
        "array_append",
        Sequelize.col("favorites"),
        `{"title":"${title}","id":${id},"posterPath":"${posterPath}"}`
      ),
    },
    { where: { username } }
  );
  res.send(`${title} Saved As Favorite Successfully.`);
};

const addToWatchList = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(cookie);
  const { title, id, posterPath } = req.body;
  const show = { title: title, id: id, posterPath: posterPath, watched: false };
  await User.update(
    {
      watchlist: Sequelize.fn(
        "array_append",
        Sequelize.col("watchlist"),
        JSON.stringify(show)
      ),
    },
    { where: { username } }
  );
  res.send(`${title} Added To WatchList.`);
};

const addToWatchListForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { title, id, posterPath } = req.body;
  const show = { title: title, id: id, posterPath: posterPath, watched: false };
  await User.update(
    {
      watchlist: Sequelize.fn(
        "array_append",
        Sequelize.col("watchlist"),
        JSON.stringify(show)
      ),
    },
    { where: { username } }
  );
  res.send(`${title} Added To WatchList.`);
};

const watchedHandler = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  let username = decode(cookie);
  const { id } = req.body;
  const watchList = await User.getWatchList(username);
  const show = watchList.find((w) => w.id === id);
  show.watched = true;
  const filteredWatchList = watchList.filter((f) => f.id !== id);
  filteredWatchList.push(show);
  await User.update({ watchlist: filteredWatchList }, { where: { username } });
  res.send(`Marked Watched`);
};

const watchedHandlerForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { id } = req.body;
  const watchList = await User.getWatchList(username);
  const watchedShow = watchList.find((show) => show.id === id);
  watchedShow.watched = true;
  const filteredWatchList = watchList.filter((f) => f.id !== id);
  filteredWatchList.push(watchedShow);
  await User.update({ watchlist: filteredWatchList }, { where: { username } });
  res.send(`Marked Watched`);
};

const updateUserDetails = async (req, res, User) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  if (!token) {
    res.status(401);
    res.send("Unauthorized User");
  }
  const { password } = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  let username = decode(cookie);
  const { name, age, explicitFlag, languages } = req.body;
  await User.updateUser(username, password, name, age, explicitFlag, languages);
  res.send("User details Updated");
};

const updateUserDetailsForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { name, age, explicitFlag, languages } = req.body;
  await User.updateUserForMobile(username, name, age, explicitFlag, languages);
  res.send("User details Updated");
};

const updatePasswordForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { oldPassword, newPassword } = req.body;
  await User.updatePassword(oldPassword, newPassword, username, res);
};

const updateSubscriptionForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { subscription } = req.body;
  await User.updateSubscription(subscription, username, res);
};

const updateSubscription = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  let username = decode(cookie);
  const { subscription } = req.body;
  await User.updateSubscription(subscription, username, res);
};

module.exports = {
  favoriteHandler,
  addToWatchList,
  watchedHandler,
  watchedHandlerForMobile,
  updateUserDetails,
  mobileFavoriteHandler,
  addToWatchListForMobile,
  updateUserDetailsForMobile,
  updatePasswordForMobile,
  updateSubscription,
  updateSubscriptionForMobile,
};
