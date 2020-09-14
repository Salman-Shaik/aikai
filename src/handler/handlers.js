const jwt = require('jsonwebtoken');
const _ = require('lodash');

const loginHandler = async (req, res, User) => {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token) {
        res.status(401);
        res.send("Unauthorized User")
    }
    const {username, password} = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
    await User.validateUser(username, password, res);
};

const registrationHandler = async (req, res, User) => {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token) {
        res.status(401);
        res.send("Unauthorized User")
    }
    const {username, password} = jwt.verify(token, "ADHIIDHIKAADHUADHEIDHI");
    const {name} = req.body;
    await User.createUser(username, password, name);
    await User.findByUsername(username);
    return res.send('Sign Up Success!');
}

const apiKeySetter = (req, res, next) => {
    let cookie = req.cookies.apiKey;
    if (!cookie) {
        res.cookie('apiKey', '8f38dc176aea0ef9cbb167f50a8fc9b2');
    } else {
        console.info("Api Key cookie already exists");
    }
    next();
};

module.exports = {
    loginHandler,
    apiKeySetter,
    registrationHandler
}