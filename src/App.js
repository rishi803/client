import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import MemeCard from './components/MemeCard';
import MemeForm from './components/MemeForm';
import Leaderboard from './components/Leaderboard';
import TerminalEffect from './components/TerminalEffect';
import './index.css';

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 10, // Increased attempts
  reconnectionDelay: 2000, // Longer delay
  timeout: 20000 // Increased connection timeout
});

function App() {
  const [memes, setMemes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState('neonhacker');

  useEffect(() => {
    // Fetch memes
    axios.get(`${process.env.REACT_APP_API_URL}/memes`)
      .then((res) => {
        console.log('Fetched memes:', res.data);
        setMemes(res.data);
      })
      .catch((err) => console.error('Failed to fetch memes:', err.message));

    // Fetch leaderboard
    axios.get(`${process.env.REACT_APP_API_URL}/leaderboard`)
      .then((res) => {
        console.log('Fetched leaderboard:', res.data);
        setLeaderboard(res.data);
      })
      .catch((err) => console.error('Failed to fetch leaderboard:', err.message));

    // Socket events
    socket.on('connect', () => console.log('Socket connected'));
    socket.on('new_meme', (meme) => {
      console.log('Received new meme:', meme);
      setMemes((prev) => [meme, ...prev]);
    });
    socket.on('new_bid', ({ meme_id, credits, user }) => {
      console.log('Received new bid:', { meme_id, credits, user });
      setMemes((prev) =>
        prev.map((m) => m.id === meme_id ? { ...m, latestBid: { credits, user } } : m)
      );
    });
    socket.on('vote_update', ({ meme_id, upvotes }) => {
      console.log('Received vote update:', { meme_id, upvotes });
      setMemes((prev) =>
        prev.map((m) => m.id === meme_id ? { ...m, upvotes } : m)
      );
    });
    socket.on('leaderboard_update', (data) => {
      console.log('Received leaderboard update:', data);
      setLeaderboard(data);
    });
    socket.on('disconnect', () => console.log('Socket disconnected'));
    socket.on('connect_error', (err) => console.error('Socket error:', err.message));

    return () => {
      socket.off('new_meme');
      socket.off('new_bid');
      socket.off('vote_update');
      socket.off('leaderboard_update');
      socket.disconnect();
      console.log('Socket cleanup');
    };
  }, []);


  return (
    <div className="p-4 max-w-6xl mx-auto">
      <TerminalEffect text="CYBERMEME MARKET: NEON CHAOS" />
      <h1 className="text-4xl text-neon-pink glitch mb-4">CYBERMEME MARKET</h1>
      <MemeForm user={user} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl text-neon-blue mb-2">Meme Gallery</h2>
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} user={user} socket={socket} />
          ))}
        </div>
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </div>
  );
}

export default App;