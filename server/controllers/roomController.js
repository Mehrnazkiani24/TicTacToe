// roomController.js
const Room = require("../models/Room");
const { v4: uuidv4 } = require("uuid");

exports.createRoom = async (req, res) => {
  try {
    const roomId = uuidv4();
    const newRoom = new Room({
      roomId,
      players: [req.user.id.toString()],
      currentTurn: null, // No turn until another player joins
    });
    await newRoom.save();
    res.json({ roomId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.joinRoom = async (req, res) => {
  const { roomId } = req.body;
  try {
    let room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(400).json({ msg: "Room not found" });
    }

    if (room.players.length >= 2) {
      return res.status(400).json({ msg: "Room is full" });
    }

    room.players.push(req.user.id.toString());

    if (room.players.length === 2) {
      // Randomly assign turn to one of the players
      room.currentTurn = room.players[Math.floor(Math.random() * 2)];
    }

    await room.save();
    console.log(`Player ${req.user.id.toString()} joined room ${roomId}`);
    res.json({ msg: "Joined room", roomId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
