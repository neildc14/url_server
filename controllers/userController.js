const User = require("../model/userModel");
const createToken = require("../helpers/createToken");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const new_user = await User.signup(username, email, password);
    const id = new_user._id;
    const token = createToken(new_user._id);
    res.status(201).json({id, username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login_user = await User.login(email, password);
    const id = login_user._id;
    const username = login_user.username;
    const token = createToken(login_user._id);
    res.status(200).json({ id, username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
