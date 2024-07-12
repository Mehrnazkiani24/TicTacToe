import React from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import JoinRoom from "../components/JoinRoom.jsx";
import GameBoard from "../components/GameBoard.jsx";

const Home = () => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Register />
      <Login />
      <JoinRoom />
    </div>
  );
};

export default Home;
