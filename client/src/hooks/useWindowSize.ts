import { useState, useEffect } from 'react';

/**
 * Returns the current window dimensions and updates on resize.
 *
 * @returns An object containing the current window width and height in pixels.
 */
export const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
