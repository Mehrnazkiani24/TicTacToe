import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import apolloClient from './apolloClient';
import io from 'socket.io-client'; // Import Socket.IO client

// GraphQL Query to fetch games
const GET_GAMES = gql`
  query GetGames {
    games {
      id
      players {
        id
        username
      }
      status
    }
  }
`;

// GraphQL Mutation to create a new game
const CREATE_GAME = gql`
  mutation CreateGame($playerId: ID!) {
    createGame(playerId: $playerId) {
      id
      players {
        id
        username
      }
      status
    }
  }
`;

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    let nextRoomId = 1000; // Initialize the room ID counter

    // Fetch games from GraphQL server
    const { loading: gamesLoading, error: gamesError, data: gamesData } = useQuery(GET_GAMES);

    // Handle creating a new game
    const [createGame] = useMutation(CREATE_GAME);

    useEffect(() => {
        // Simulate a delay in fetching rooms
        setTimeout(() => {
            setIsLoading(false);
            // Example rooms data
            setRooms([
                { _id: '1', status: 'Available' },
                { _id: '2', status: 'Occupied' },
            ]);
        }, 2000);
    }, []);

    const handleCreateGame = () => {
        createGame({
            variables: { playerId: 'someUserId' }, // Replace 'someUserId' with actual user ID
        }).then((result) => {
            console.log(result.data.createGame);
        });
    };

    useEffect(() => {
        const socket = io('http://localhost:5001'); 
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        // Listen for Socket.IO events
        socket.on('opponentJoined', (data) => {
            console.log('Opponent joined:', data);
        });

        socket.on('assignMark', (mark) => {
            console.log('Assigned mark:', mark);
        });

        socket.on('moveMade', (data) => {
            console.log('Move made:', data);
        });

        socket.on('gameOver', (data) => {
            console.log('Game over:', data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (isLoading || gamesLoading) return <p>Loading...</p>;

    return (
        <Router>
            <div id="page_header">
                <h1>Tic-Tac-Toe Dashboard</h1>
            </div>
            <div className="dashboard-container">
                <h2 className="heading">Manage Games</h2>
                <div className="button-container">
                    <button onClick={handleCreateGame} className="create-game-button">Create New Game</button>
                </div>
                {/* Render games fetched from GraphQL server */}
            </div>
            <Routes>
                <Route path="/join-room/:roomId" element={<JoinRoom />} />
            </Routes>
        </Router>
    );
};

export default Dashboard;
