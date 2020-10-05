const _ = require("lodash");
const { decode } = require("js-base64");

const getExplicitFlag = async (req, res, User) => {
  let cookie = req.cookies.user;
  if (!!cookie) {
    const username = decode(cookie);
    const userObj = await User.findByUsername(username);
    const explicitFlag = userObj.explicitFlag;
    return res.send(JSON.stringify({ flagStatus: explicitFlag }));
  }
  res.send(JSON.stringify({ flagStatus: true }));
};

const getFavorites = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(cookie);
  const FavoritesObj = await User.getFavorites(username);
  const titles = JSON.stringify(FavoritesObj);
  return res.send(titles);
};

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
};

const getLanguages = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    return res.send(JSON.stringify([]));
  }
  let username = decode(cookie);
  const languages = await User.getLanguages(username);
  const titles = JSON.stringify(languages);
  return res.send(titles);
};

module.exports = {
  getExplicitFlag,
  getFavorites,
  getWatchList,
  getLanguages,
};
