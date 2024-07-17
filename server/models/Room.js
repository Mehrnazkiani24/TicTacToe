const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  players: [
    {
      type: String,
    },
  ],
  gameState: {
    type: Array,
    default: Array(9).fill(null),
  },
  currentTurn: {
    type: String,
  },
});

module.exports = Room = mongoose.model("room", RoomSchema);
