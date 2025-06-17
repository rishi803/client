import React from 'react';

function Leaderboard({ leaderboard }) {
  return (
    <div className="bg-cyber-black p-4 rounded-lg shadow-lg shadow-neon-blue">
      <h2 className="text-2xl text-neon-pink mb-2">Trending Memes</h2>
      {leaderboard?.length === 0 ? (
        <p className="text-neon-blue">No trending memes yet!</p>
      ) : (
        <ul>
          {leaderboard?.map((meme, index) => (
            <li key={meme.id} className="text-neon-blue mb-1">
              {index + 1}. {meme.title} ({meme.upvotes} upvotes)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;