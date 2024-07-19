import React from "react";
import { useParams } from "react-router-dom";
import GameBoard from "../components/GameBoard";

const Game = () => {
  const { id } = useParams();
  return (
    <div className="game-container">
      <h1>Game Room: {id}</h1>
      <GameBoard gameId={id} />
    </div>
  );
};

export default Game;
