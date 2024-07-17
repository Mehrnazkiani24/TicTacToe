import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./GameRoom.css";

const socket = io("http://localhost:5001");

const GameRoom = () => {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState(null);
  const [userMark, setUserMark] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [winner, setWinner] = useState(null);

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

  const handleClick = (index) => {
    if (gameState[index] || currentTurn !== userId || winner) return;
    const newGameState = gameState.slice();
    newGameState[index] = userMark;
    setGameState(newGameState);

    const gameWinner = checkWinner(newGameState);

    // if (gameWinner) {
    //   socket.emit("gameOver", {
    //     roomId,
    //     gameState: newGameState,
    //     winner: gameWinner,
    //   });
    // } else {
    socket.emit("makeMove", { roomId, gameState: newGameState, userId });
    // }
  };

  useEffect(() => {
    socket.emit("joinRoom", { roomId, userId });

    socket.on("assignMark", (mark) => {
      setUserMark(mark);
    });

    socket.on("moveMade", ({ gameState, currentTurn }) => {
      setGameState(gameState);
      setCurrentTurn(currentTurn);
    });

    socket.on("opponentJoined", ({ currentTurn }) => {
      setCurrentTurn(currentTurn);
    });

    socket.on("gameOver", ({ gameState, winner }) => {
      setGameState(gameState);
      setWinner(winner);
    });

    return () => {
      socket.off("assignMark");
      socket.off("moveMade");
      socket.off("opponentJoined");
      socket.off("gameOver");
    };
  }, [roomId, userId]);

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {gameState[index]}
    </button>
  );

  return (
    <div>
      <h3>Room ID: {roomId}</h3>
      <div className="status">
        {winner
          ? winner === userMark
            ? `You win!`
            : `You lose!`
          : currentTurn === userId
          ? "Your turn"
          : currentTurn
          ? "Opponent's turn"
          : "Waiting for opponent to join..."}
      </div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
