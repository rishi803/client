import React, { useEffect, useState } from 'react';

function TerminalEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="text-neon-green font-mono text-lg mb-2 animate-pulse">
      {displayText}
      <span className="animate-blink">█</span>
    </div>
  );
}

export default TerminalEffect;