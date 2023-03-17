const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    watchlist: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Movie",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
