import React, { useState } from "react";
import axios from "axios";

const JoinRoom = ({ token }) => {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/room/create",
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setRoomId(response.data.roomId);
      setMessage("Room created successfully. Room ID: " + response.data.roomId);
    } catch (error) {
      setMessage("Failed to create room. Please try again.");
    }
  };

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/room/join",
        { roomId },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setMessage("Joined room successfully.");
    } catch (error) {
      setMessage("Failed to join room. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinRoom;
