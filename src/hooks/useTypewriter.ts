import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 80, startDelay = 500): string {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayed('');
    setIndex(0);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          setDisplayed(text.slice(0, prev + 1));
          return prev + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
    };
  }, [text, speed, startDelay]);

  return displayed;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(pct);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}
