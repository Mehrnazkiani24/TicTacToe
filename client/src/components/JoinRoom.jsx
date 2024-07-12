import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const CREATE_GAME = gql`
  mutation CreateGame($playerId: ID!) {
    createGame(playerId: $playerId) {
      id
    }
  }
`;

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const [createGame] = useMutation(CREATE_GAME);

  const handleCreateRoom = async () => {
    const playerId = localStorage.getItem("userId"); // Assume userId is stored in localStorage after login
    const { data } = await createGame({ variables: { playerId } });
    navigate(`/game/${data.createGame.id}`);
  };

  const handleJoinRoom = () => {
    navigate(`/game/${roomId}`);
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
