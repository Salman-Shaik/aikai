const jwt = require("jsonwebtoken");

const loginHandler = async (req, res, User) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  if (!token) {
    res.status(401);
    res.send("Unauthorized User");
  }
  const { username, password } = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
  await User.validateUser(username, password, res);
};

const registrationHandler = async (req, res, User) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  if (!token) {
    res.status(401);
    res.send("Unauthorized User");
  }
  const { username, password } = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
  const { name, age, explicitFlag } = req.body;
  await User.createUser(username, password, name, age, explicitFlag);
  await User.findByUsername(username);
  return res.send("Sign Up Success!");
};

module.exports = {
  loginHandler,
  registrationHandler,
};
