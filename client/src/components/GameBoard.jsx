import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

const GET_GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      id
      board
      turn {
        id
        username
      }
      players {
        id
        username
      }
    }
  }
`;

const MAKE_MOVE = gql`
  mutation MakeMove($gameId: ID!, $playerId: ID!, $moveIndex: Int!) {
    makeMove(gameId: $gameId, playerId: $playerId, moveIndex: $moveIndex) {
      id
      board
      turn {
        id
        username
      }
    }
  }
`;

const GameBoard = ({ gameId }) => {
  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { id: gameId },
  });

  const [makeMove] = useMutation(MAKE_MOVE);

  const handleMove = async (index) => {
    const playerId = localStorage.getItem("userId");
    await makeMove({ variables: { gameId, playerId, moveIndex: index } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { board, turn } = data.game;

  return (
    <div>
      <h2>Turn: {turn.username}</h2>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleMove(index)}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
