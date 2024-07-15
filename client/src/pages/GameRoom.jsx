import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const GameRoom = () => {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("moveMade", (newGameState) => {
      setGameState(newGameState);
      setIsXNext((prev) => !prev);
    });

    return () => {
      socket.off("moveMade");
    };
  }, [roomId]);

  const handleClick = (index) => {
    const newGameState = gameState.slice();
    if (calculateWinner(gameState) || newGameState[index]) {
      return;
    }
    newGameState[index] = isXNext ? "X" : "O";
    setGameState(newGameState);
    setIsXNext(!isXNext);
    socket.emit("makeMove", { roomId, gameState: newGameState });
  };

  const calculateWinner = (squares) => {
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
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(gameState);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <div>{status}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
        }}
      >
        {gameState.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{ width: "100px", height: "100px", fontSize: "24px" }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameRoom;
