import React, { useState } from 'react';
import axios from 'axios';

function MemeCard({ meme, user, socket }) {
  const [bid, setBid] = useState('');

  const handleBid = async (e) => {
    e.preventDefault();
    if (!bid || bid <= 0) return alert('Enter a valid bid!');
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/bids`, {
          meme_id: meme.id,
          user,
          credits: parseInt(bid)
        });
        setBid('');
      } catch (err) {
      console.error('Bid failed:', err.response?.data || err.message);
      alert('Bid failed!');
    }
  };

  const handleVote = async (type) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/memes/${meme.id}/vote`, { type, user });
    } catch (err) {
      console.error('Vote failed:', err.response?.data || err.message);
      alert('Vote failed!');
    }
  };

  return (
    <div className="bg-cyber-black p-4 rounded-lg shadow-lg shadow-neon-pink mb-4">
      <h3 className="text-lg text-neon-blue">{meme.title}</h3>
      <img src={meme.image_url} alt={meme.title} className="w-full h-48 object-cover rounded mb-2" />
      <p className="text-neon-green italic">"{meme.caption}"</p>
      <p className="text-neon-pink">Vibe: {meme.vibe}</p>
      <p className="text-neon-blue">Tags: {meme.tags.join(', ')}</p>
      <p className="text-neon-blue">Upvotes: {meme.upvotes}</p>
      {meme.latestBid && (
        <p className="text-neon-blue">Latest Bid: {meme.latestBid.credits} credits by {meme.latestBid.user}</p>
      )}
      <form onSubmit={handleBid} className="mt-2">
        <input
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="Bid credits"
          className="bg-cyber-black text-neon-blue border border-neon-pink p-2 rounded w-1/2 mr-2"
        />
        <button type="submit" className="bg-neon-blue text-cyber-black px-4 py-2 rounded hover:glitch">
          Bid
        </button>
      </form>
      <div className="mt-2">
        <button
          onClick={() => handleVote('up')}
          className="bg-neon-pink text-cyber-black px-4 py-2 rounded hover:glitch mr-2"
        >
          Upvote
        </button>
        <button
          onClick={() => handleVote('down')}
          className="bg-neon-blue text-cyber-black px-4 py-2 rounded hover:glitch"
        >
          Downvote
        </button>
      </div>
    </div>
  );
}

export default MemeCard;