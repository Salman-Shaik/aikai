const { encode } = require("js-base64");

const bcrypt = require("bcrypt");
const _ = require("lodash");

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      explicitFlag: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
        defaultValue: false,
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        unique: false,
        defaultValue: [],
      },
      watchlist: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        unique: false,
        defaultValue: [],
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        unique: false,
      },
      subscription: {
        type: DataTypes.STRING,
        unique: false,
        defaultValue: "FREE",
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );

  User.createUser = async (
    username,
    password,
    name,
    age,
    explicitFlag,
    languages
  ) => {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) console.log(err);
      if (hash) {
        await User.create({
          username,
          password: hash,
          name,
          age,
          explicitFlag,
          languages,
        });
      }
    });
  };

  User.updateUser = async (
    username,
    password,
    name,
    age,
    explicitFlag,
    languages
  ) => {
    if (password === "") {
      await User.update(
        {
          name,
          age,
          explicitFlag,
          languages,
        },
        { where: { username } }
      );
    } else {
      await bcrypt.hash(password, 10, async (err, hash) => {
        if (err) console.log(err);
        if (hash) {
          await User.update(
            {
              password: hash,
              name,
              age,
              explicitFlag,
              languages,
            },
            { where: { username } }
          );
        }
      });
    }
  };

  User.updateUserForMobile = async (
    username,
    name,
    age,
    explicitFlag,
    languages
  ) => {
    await User.update(
      {
        name,
        age,
        explicitFlag,
        languages,
      },
      { where: { username } }
    );
  };

  User.updatePassword = async (oldPassword, newPassword, username, res) => {
    const userObj = await User.findByUsername(username);
    if (_.isEmpty(userObj)) {
      return;
    }
    await bcrypt.compare(oldPassword, userObj.password, async (err, result) => {
      if (result) {
        await bcrypt.hash(newPassword, 10, async (err, hash) => {
          await User.update(
            {
              password: hash,
            },
            { where: { username } }
          );
        });
        res.send("Password Updated Successfully");
      } else {
        res.status(401);
        res.send("Invalid Password");
      }
    });
  };
  User.validateUser = async (username, password, res) => {
    const userObj = await User.findByUsername(username);
    if (_.isEmpty(userObj)) {
      res.status(401);
      return res.send("User Not Found");
    }
    await bcrypt.compare(password, userObj.password, (err, result) => {
      if (result) {
        res.cookie("user", encode(username));
        res.send(JSON.stringify({ user: encode(username) }));
      } else {
        res.status(401);
        res.send("Invalid Password");
      }
    });
  };

  User.findByUsername = async (username) => {
    return await User.findOne({
      where: { username: username },
    });
  };

  User.getFavorites = async (username) => {
    const user = await User.findByUsername(username);
    return user.favorites;
  };

  User.getWatchList = async (username) => {
    const user = await User.findByUsername(username);
    return user.watchlist;
  };

  User.getLanguages = async (username) => {
    const user = await User.findByUsername(username);
    return user.languages;
  };

  return User;
};

module.exports = user;
