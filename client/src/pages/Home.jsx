import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import JoinRoom from "../components/JoinRoom";
import "./Home.css";

const Home = () => {
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <div className="home-container">
      <h1 className="title">Tic Tac Toe</h1>
      <Register />
      <Login onLoginSuccess={handleLoginSuccess} />
      {token && <JoinRoom token={token} />}
    </div>
  );
};

export default Home;
