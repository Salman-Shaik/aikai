const { decode } = require("js-base64");
const _ = require("lodash");

const validateUser = async (req, res, next, User) => {
  let cookie = req.cookies.user;
  if (!!cookie) {
    await User.findByUsername(decode(cookie))
      .then((obj) => {
        if (_.isEmpty(obj)) {
          res.clearCookie("user");
          console.info("Cleared User Cookie");
        }
        return obj;
      })
      .catch((e) => {
        res.clearCookie("user");
        console.info("Cleared User Cookie");
        console.warn(e);
      });
  }
  next();
};
const currentShowSetter = (req, res, next) => {
  const show = req.query.showId;
  const showType = req.query.showType;
  if (!!show && !!showType) {
    res.cookie("showId", show);
    res.cookie("showType", showType);
    res.redirect("/");
  } else {
    res.clearCookie("showId");
    res.clearCookie("showType");
  }
  next();
};
const apiKeySetter = (req, res, next) => {
  let cookie = req.cookies.apiKey;
  if (!cookie) {
    res.cookie("apiKey", "8f38dc176aea0ef9cbb167f50a8fc9b2");
  }
  next();
};

module.exports = {
  validateUser,
  currentShowSetter,
  apiKeySetter,
};
