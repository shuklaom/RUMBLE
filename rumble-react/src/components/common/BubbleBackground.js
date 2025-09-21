import { useEffect } from 'react';

const BubbleBackground = () => {
  useEffect(() => {
    // Container for bubbles
    const bubblesContainer = document.getElementById('bubbles');
    
    if (!bubblesContainer) return;

    // Clean up any existing bubbles
    bubblesContainer.innerHTML = '';

    // Array of colors to complement the dark slate background with emerald/cyan theme
    const bubbleColors = [
      'rgba(16, 185, 129, 0.15)', // emerald-500 with low opacity
      'rgba(6, 182, 212, 0.15)',  // cyan-500 with low opacity
      'rgba(52, 211, 153, 0.12)', // emerald-400 with very low opacity
      'rgba(34, 197, 94, 0.18)',  // green-500 with low opacity
      'rgba(14, 165, 233, 0.12)', // blue-500 with very low opacity
      'rgba(59, 130, 246, 0.15)', // blue-500 with low opacity
      'rgba(139, 92, 246, 0.10)', // violet-500 with very low opacity
      'rgba(168, 85, 247, 0.12)'  // purple-500 with low opacity
    ];

    const bubbleCount = 20; // Max number of bubbles
    const spacing = 100 / bubbleCount; // Even horizontal distribution

    // Generate all bubbles
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');

      // Random size and animation parameters
      const size = Math.floor(Math.random() * 80) + 30; // 30–110px (slightly larger)
      const duration = Math.random() * 25 + 15; // 15–40s (slower movement)
      const delay = Math.random() * 15; // 0–15s
      const left = i * spacing + Math.random() * spacing; // Evenly spaced with randomness
      const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

      // Apply styles
      bubble.className = 'bubble';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.bottom = `-${size}px`;
      bubble.style.background = color;
      bubble.style.boxShadow = `0 0 ${size/3}px ${color}, inset 0 0 ${size/4}px rgba(255,255,255,0.1)`;
      bubble.style.border = '1px solid rgba(255,255,255,0.1)';
      bubble.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;

      // Add bubble to DOM
      bubblesContainer.appendChild(bubble);
    }

    // Cleanup function to remove bubbles when component unmounts
    return () => {
      if (bubblesContainer) {
        bubblesContainer.innerHTML = '';
      }
    };
  }, []);

  return <div id="bubbles"></div>;
};

export default BubbleBackground;
