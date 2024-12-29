const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  const SALT = 10
  const hashedPassword = await bcrypt.hash(this.password,SALT);
  this.password = hashedPassword;
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
