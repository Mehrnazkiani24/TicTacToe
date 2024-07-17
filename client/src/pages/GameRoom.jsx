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

    return () => {
      socket.off("assignMark");
      socket.off("moveMade");
      socket.off("opponentJoined");
    };
  }, [roomId, userId]);

  const handleClick = (index) => {
    if (gameState[index] || currentTurn !== userId) return;
    const newGameState = gameState.slice();
    newGameState[index] = userMark;
    setGameState(newGameState);

    socket.emit("makeMove", { roomId, gameState: newGameState, userId });
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {gameState[index]}
    </button>
  );

  return (
    <div>
      <h3>Room ID: {roomId}</h3>
      <div className="status">
        {currentTurn === userId
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
