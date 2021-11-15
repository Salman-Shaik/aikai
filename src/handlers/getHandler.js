const _ = require("lodash");
const { decode } = require("js-base64");
const path = require("path");

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

const getFavoritesForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const userFavorites = await User.getFavorites(username);
  const titles = JSON.stringify(userFavorites);
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

const getWatchListForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const watchListObj = await User.getWatchList(username);
  const titles = JSON.stringify(watchListObj);
  return res.send(titles);
};

const getUserDetails = async (req, res, User) => {
  let cookie = req.cookies.user;
  if (!!cookie) {
    const username = decode(cookie);
    const { name, age, explicitFlag, languages, country } =
      await User.findByUsername(username);
    return res.send(
      JSON.stringify({ name, age, explicitFlag, languages, country })
    );
  }
  res.status(401);
  res.send("User Not logged In");
};

const getUserDetailsForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (!_.isEmpty(userToken)) {
    const username = decode(userToken);
    const { name, age, explicitFlag, languages, country } =
      await User.findByUsername(username);
    return res.send(
      JSON.stringify({ name, age, explicitFlag, languages, country })
    );
  }
  res.status(401);
  res.send("User Not logged In");
};

const getUserFullName = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { name } = await User.findByUsername(username);
  return res.send(JSON.stringify({ name }));
};

const isValidReactRoute = (url) => {
  const validRoutes = [
    "/login",
    "/register",
    "/update_profile",
    "/favorite_shows",
    "/watch_list",
    "/now_playing",
    "/search",
    "/movies",
    "/tv_shows",
    "/editors_choice",
    "/",
    "/not-found",
    "/terms_and_conditions",
    "/privacy_policy",
    "/refund_policy",
    "/about_us",
    "/download_app",
    "/curated_lists",
    "/curated_list_gallery",
  ];
  return validRoutes.includes(url);
};

const handleReactRoutingRequests = (req, res) => {
  const url = req.url;
  if (isValidReactRoute(url)) {
    return res.sendFile(path.join(__dirname, "../../build", "index.html"));
  }
  res.status(404).redirect("/not-found");
};

const getSubscription = async (req, res, User) => {
  const cookie = req.cookies.user;
  if (_.isEmpty(cookie)) {
    return res.send(JSON.stringify([]));
  }
  let username = decode(cookie);
  const { subscription } = await User.findByUsername(username);
  return res.send(JSON.stringify({ subscription }));
};

const getSubscriptionForMobile = async (req, res, User) => {
  const userToken = req.query.user;
  if (_.isEmpty(userToken)) {
    res.status(401);
    return res.send("User not logged in");
  }
  const username = decode(userToken);
  const { subscription } = await User.findByUsername(username);
  return res.send(JSON.stringify({ subscription }));
};
module.exports = {
  getFavorites,
  getWatchList,
  getUserDetails,
  handleReactRoutingRequests,
  getFavoritesForMobile,
  getWatchListForMobile,
  getUserFullName,
  getUserDetailsForMobile,
  getSubscription,
  getSubscriptionForMobile,
};
