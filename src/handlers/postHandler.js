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

const mobileLoginHandler = async (req, res, User) => {
  const { username, password } = req.body;
  await User.validateUser(username, password, res);
};

const registrationHandler = async (req, res, User) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  if (!token) {
    res.status(401);
    res.send("Unauthorized User");
  }
  const { username, password } = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
  const { name, age, explicitFlag, languages, country } = req.body;
  await User.createUser(
    username,
    password,
    name,
    age,
    explicitFlag,
    languages,
    country
  );
  await User.findByUsername(username);
  return res.send("Sign Up Success!");
};

const mobileRegistrationHandler = async (req, res, User) => {
  const { name, age, explicitFlag, languages, username, password } = req.body;
  await User.createUser(username, password, name, age, explicitFlag, languages);
  await User.findByUsername(username);
  return res.send("Sign Up Success!");
};

module.exports = {
  loginHandler,
  registrationHandler,
  mobileLoginHandler,
  mobileRegistrationHandler,
};
