const _ = require("lodash");
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
  res.send(`Removed From Watchlist`);
};

module.exports = {
  favoriteHandler,
  addToWatchList,
  watchedHandler,
};
