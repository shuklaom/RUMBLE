import { useEffect } from 'react';
import './BubbleBackground.css';

const BubbleBackground = () => {
  useEffect(() => {
    // Container for bubbles
    const bubblesContainer = document.getElementById('bubbles');
    
    if (!bubblesContainer) return;

    // Clean up any existing bubbles
    bubblesContainer.innerHTML = '';

    // Array of semi-transparent colors to complement the background
    const bubbleColors = [
      'rgba(173, 216, 230, 0.2)', // lightblue
      'rgba(147, 112, 219, 0.2)', // mediumpurple
      'rgba(255, 182, 193, 0.2)', // lightpink
      'rgba(144, 238, 144, 0.2)', // lightgreen
      'rgba(135, 206, 235, 0.2)', // skyblue
      'rgba(255, 160, 122, 0.2)'  // lightsalmon
    ];

    const bubbleCount = 20; // Max number of bubbles
    const spacing = 100 / bubbleCount; // Even horizontal distribution

    // Generate all bubbles
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');

      // Random size and animation parameters
      const size = Math.floor(Math.random() * 100) + 20; // 20–120px
      const duration = Math.random() * 20 + 10; // 10–30s
      const delay = Math.random() * 10; // 0–10s
      const left = i * spacing + Math.random() * spacing; // Evenly spaced with randomness
      const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

      // Apply styles
      bubble.className = 'bubble';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.bottom = `-${size}px`;
      bubble.style.background = color;
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
