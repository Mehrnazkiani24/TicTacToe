const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createGame,
  joinGame,
  makeMove,
} = require("../controllers/gameController");

// Protect these routes with the auth middleware
router.post("/create", auth, createGame);
router.post("/join", auth, joinGame);
router.post("/move", auth, makeMove);

module.exports = router;
