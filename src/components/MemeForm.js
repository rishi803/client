import React, { useState } from 'react';
import axios from 'axios';

function MemeForm({ user }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagArray = tags.split(',').map((t) => t.trim()).filter((t) => t);
    const memeData = {
      title,
      image_url: imageUrl || 'https://picsum.photos/200', // Hacky default
      tags: tagArray,
      owner: user,
    };
    console.log('Sending meme:', memeData); // Debug
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/memes`, memeData);
      console.log('Meme created:', res.data); // Debug
      setTitle('');
      setImageUrl('');
      setTags('');
    } catch (err) {
      console.error('Meme creation failed:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cyber-black p-4 rounded-lg shadow-lg shadow-neon-blue mb-4">
      <h3 className="text-xl text-neon-pink mb-2">Hack a Meme</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Meme Title"
        className="bg-cyber-black text-neon-blue border border-neon-pink p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="bg-cyber-black text-neon-blue border border-neon-pink p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="bg-cyber-black text-neon-blue border border-neon-pink p-2 rounded w-full mb-2"
      />
      <button type="submit" className="bg-neon-blue text-cyber-black px-4 py-2 rounded hover:glitch">
        Create Meme
      </button>
    </form>
  );
}

export default MemeForm;