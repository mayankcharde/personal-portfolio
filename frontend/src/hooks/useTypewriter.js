import { useState, useEffect } from 'react';

/**
 * A custom hook to animate text typing.
 * @param {string|string[]} input - The text or array of texts to type.
 * @param {number} speed - Typing speed per character in milliseconds.
 * @param {number} delay - Delay before typing starts or between loops in milliseconds.
 * @param {boolean} loop - Whether to loop through the array of texts.
 */
export default function useTypewriter(input, speed = 40, delay = 1000, loop = false) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Respect accessibility settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (Array.isArray(input)) {
        setDisplayText(input[0]);
      } else {
        setDisplayText(input);
      }
      return;
    }

    if (typeof input === 'string') {
      if (subIndex < input.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + input[subIndex]);
          setSubIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    } else if (Array.isArray(input) && input.length > 0) {
      // Loop or sequence of texts
      if (isDeleting) {
        if (subIndex > 0) {
          const timeout = setTimeout(() => {
            setDisplayText((prev) => prev.substring(0, prev.length - 1));
            setSubIndex((prev) => prev - 1);
          }, speed / 2);
          return () => clearTimeout(timeout);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % input.length);
        }
      } else {
        if (subIndex < input[index].length) {
          const timeout = setTimeout(() => {
            setDisplayText((prev) => prev + input[index][subIndex]);
            setSubIndex((prev) => prev + 1);
          }, speed);
          return () => clearTimeout(timeout);
        } else if (loop) {
          const timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delay);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [subIndex, index, isDeleting, input, speed, delay, loop]);

  return displayText;
}
