const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // maybe userAuthInfo{ {...} ..} ???
  name: {
    type: String,
    required: [true, "Set name for user"],
  },
  login: {
    type: String,
    required: [true, "Set login for user"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },

  userInfo: {
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    desiredWeight: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: Number,
      required: true,
      // type is Number, and default meaning -do we need?
    },
  },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
