import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameRoom from "./pages/GameRoom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<GameRoom />} />
    </Routes>
  );
};

export default App;
