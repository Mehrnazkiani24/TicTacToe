import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import JoinRoom from "../components/JoinRoom";

const Home = () => {
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Register />
      <Login onLoginSuccess={handleLoginSuccess} />
      {token && <JoinRoom token={token} />}
    </div>
  );
};

export default Home;
