import React from "react";
import JoinRoom from "../components/JoinRoom";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Login />
      <Register />
      <JoinRoom />
    </div>
  );
};

export default Home;
