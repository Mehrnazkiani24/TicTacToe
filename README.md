
# Tic Tac Toe Multiplayer Game

## Description

This is a real-time multiplayer Tic Tac Toe game built using the MERN stack (MongoDB, Express.js, React, Node.js) with Socket.io for real-time communication. Players can create or join game rooms, take turns making moves, and the game will automatically determine the winner.

Live-Link: https://tictactoe-334d.onrender.com

## Features

- Real-time multiplayer gameplay
- Create or join game rooms
- Automatic turn management
- Real-time updates for both players
- Winner determination and notification

## Technologies Used

- **Frontend:** React, Socket.io-client
- **Backend:** Node.js, Express.js, Socket.io, MongoDB
- **GraphQL:** For API interactions

## User Story

As a player I want to play a game of Tic Tac Toe with another player in real-time, so that i can enjoy a nice game. As a player I want to be able to creat a new room so that I can invite other players. As a player I want to be able to see whose turn it is.

 ## Game Mechanics
 Turn system (only one player at a time click tile to put X or O)
 Assign one player to go first and to X or O display winner/loser.


## Prerequisites

- Node.js
- MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/tic-tac-toe-multiplayer.git
   cd tic-tac-toe-multiplayer
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   ```

   Create a .env file in the server directory and add the following:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   ```

   Run the server

   ```bash
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd ../client
   npm install
   ```

   Run the client:

   ```bash
   npm start
   ```

   ## Screenshot
   <img width="1440" alt="Screenshot 2024-07-18 at 6 15 14 PM" src="https://github.com/user-attachments/assets/66be928d-fdd3-42e2-a691-96c6799b0736">








