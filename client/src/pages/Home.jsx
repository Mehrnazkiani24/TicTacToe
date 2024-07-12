import React from "react";
import Login from "../components/Login";
import JoinRoom from "../components/JoinRoom";
import GameBoard from "../components/GameBoard";
import Register from "../components/Register";

const Home = () => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Login />
      <JoinRoom />
    </div>
  );
};

export default Home;
