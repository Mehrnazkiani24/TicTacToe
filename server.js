require('dotenv').config();
const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");
const connectDB = require("./server/config/db");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Room = require("./server/models/Room");
const PORT = process.env.PORT || 5001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://git.heroku.com/somethinsimpletictactoes.git' 
    : 'http://localhost:5173',
  credentials: true
}));

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Define Routes
app.use("/api/auth", require("./server/routes/auth"));
app.use("/api/room", require("./server/routes/room"));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client", "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});


const checkWinner = (gameState) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return gameState[a];
    }
  }
  return null;
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`User ${userId} attempting to join room: ${roomId}`);
    let room = await Room.findOne({ roomId });

    if (room) {
      console.log(
        `Room found. Players: ${room.players}, Current turn: ${room.currentTurn}`
      );
      if (!room.players.includes(userId)) {
        room.players.push(userId);
        if (room.players.length === 2) {
          room.currentTurn = room.players[0]; // Ensure the first player starts
          await room.save();
          io.to(roomId).emit("opponentJoined", {
            currentTurn: room.currentTurn,
          });
        } else {
          await room.save();
        }
      }

      const playerMark = room.players[0] === userId ? "X" : "O";
      socket.emit("assignMark", playerMark);

      // Emit the current state to the client
      io.to(roomId).emit("moveMade", {
        gameState: room.gameState,
        currentTurn: room.currentTurn,
      });

      console.log(
        `Updated room state: Players: ${room.players}, Current turn: ${room.currentTurn}`
      );
    } else {
      console.log(`Room not found, creating new room with ID: ${roomId}`);
      room = new Room({
        roomId,
        players: [userId],
        currentTurn: userId, // Start with the creator
      });
      await room.save();
      socket.emit("assignMark", "X");
      console.log(
        `New room created. Player: ${userId}, Current turn: ${userId}`
      );
    }
  });

  socket.on("makeMove", async (data) => {
    const { roomId, gameState, userId } = data;

    try {
      let room = await Room.findOne({ roomId });

      if (!room) {
        socket.emit("error", "Room not found");
        return;
      }

      if (room.currentTurn !== userId) {
        socket.emit("error", "Not your turn");
        return;
      }

      room.gameState = gameState;
      const winner = checkWinner(gameState);
      console.log(`Winner: ${winner} ${gameState}`);
      if (winner) {
        await room.save();
        io.to(roomId).emit("moveMade", {
          gameState: room.gameState,
          currentTurn: room.currentTurn,
        });
        io.to(roomId).emit("gameOver", { gameState, winner }); // Emit the final game state and winner
      } else {
        const nextTurn = room.players.find((player) => player !== userId);
        room.currentTurn = nextTurn;
        await room.save();

        io.to(roomId).emit("moveMade", {
          gameState: room.gameState,
          currentTurn: room.currentTurn,
        });

        console.log(`Move made by: ${userId}`);
        console.log(`Next turn: ${room.currentTurn}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
