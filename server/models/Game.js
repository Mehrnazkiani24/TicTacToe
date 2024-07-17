const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  board: {
    type: [String],
    default: ["", "", "", "", "", "", "", "", ""],
  },
  turn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["waiting", "ongoing", "finished"],
    default: "waiting",
  },
});

module.exports = mongoose.model("Game", GameSchema);
