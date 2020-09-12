const _ = require('lodash');

const loginHandler = async (req, res, User) => {
    const {password, username} = req.body;
    const userObject = await User.findByLogin(username);
    if (_.isEmpty(userObject)) {
        res.status(401);
        res.send("Invalid User");
    }
    if (password !== userObject.password) {
        res.status(401);
        res.send("Invalid Password");
    }
    res.cookie('user', username);
    res.send("Login Successful");
};

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
    apiKeySetter
}