const loginHandler = async (req, res, User) => {
    const {password, username} = req.body;
    await User.validateUser(username, password, res);
};

const registrationHandler = async (req, res, User) => {
    const body = req.body;
    const user = await User.createUser(body);
    if (user instanceof User) return res.send('Sign Up Success!');
    res.status(422);
    res.send("Error Registering User");
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