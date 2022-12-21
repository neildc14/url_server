const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.signup = async function (username, email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This email is already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw Error("Incorrect password");
  }

  return user;
};
module.exports = mongoose.model("User", UserSchema);
