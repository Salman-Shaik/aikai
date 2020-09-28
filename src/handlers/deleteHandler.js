const { decode } = require("js-base64");
const _ = require("lodash");

const logoutUser = (req, res) => {
  const cookie = decode(req.cookies.user);
  if (!!cookie) {
    res.clearCookie("user");
    return res.send("User Logged Out");
  }
  res.status(400);
  res.send("USER COOKIE NOT FOUND");
};

const deleteFavorite = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(cookie);
  const { id } = req.body;
  const favorites = await User.getFavorites(username);
  const filteredFavorites = favorites.filter((f) => f.id !== id);
  await User.update({ favorites: filteredFavorites }, { where: { username } });
  res.send(`Deleted Favorite Successfully.`);
};

const deleteFromWatchlist = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  let username = decode(cookie);
  const { id } = req.body;
  const watchList = await User.getWatchList(username);
  const filteredWatchList = watchList.filter((w) => w.id !== id);
  await User.update({ watchlist: filteredWatchList }, { where: { username } });
  res.send(`Removed From Watchlist`);
};

module.exports = {
  logoutUser,
  deleteFavorite,
  deleteFromWatchlist,
};
