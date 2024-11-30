import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types
interface WindowSize {
  width: number;
  height: number;
}

interface SnowfallProps {
  snowflakeCount?: number;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  wind?: number;
}

// Hooks
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Utils
const SNOWFLAKE_CHARACTERS = ['❅', '❆', '❄', '❉'];

const generateSnowflakeProps = (screenWidth: number, options: Required<Omit<SnowfallProps, 'snowflakeCount'>>) => {
  const initialX = Math.random() * screenWidth;
  const drift = (Math.random() - 0.5) * options.wind;
  const finalX = initialX + drift;
  
  return {
    initialX,
    initialY: -20,
    finalX,
    duration: options.minDuration + Math.random() * (options.maxDuration - options.minDuration),
    size: options.minSize + Math.random() * (options.maxSize - options.minSize),
    opacity: 0.3 + Math.random() * 0.7,
    character: SNOWFLAKE_CHARACTERS[Math.floor(Math.random() * SNOWFLAKE_CHARACTERS.length)],
  };
};

// Snowflake Component
const Snowflake = ({ delay, options }: { delay: number; options: Required<Omit<SnowfallProps, 'snowflakeCount'>> }) => {
  const { width, height } = useWindowSize();
  const {
    initialX,
    initialY,
    finalX,
    duration,
    size,
    opacity,
    character
  } = generateSnowflakeProps(width, options);

  return (
    <motion.div
      className="absolute text-white"
      initial={{ 
        x: initialX,
        y: initialY,
        opacity: 0,
        scale: 0
      }}
      animate={{
        x: finalX,
        y: height + 10,
        opacity: [0, opacity, opacity, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
      style={{
        fontSize: size,
        textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
        filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    >
      {character}
    </motion.div>
  );
};

// Main Snowfall Component
export const SnowfallEffect: React.FC<SnowfallProps> = ({
  snowflakeCount = 50,
  minSize = 10,
  maxSize = 30,
  minDuration = 5,
  maxDuration = 15,
  wind = 200,
}) => {
  const options = {
    minSize,
    maxSize,
    minDuration,
    maxDuration,
    wind,
  };

  const snowflakes = useMemo(() => {
    return Array.from({ length: snowflakeCount }).map((_, index) => ({
      id: index,
      delay: (index * 0.2) % 5,
    }));
  }, [snowflakeCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {snowflakes.map(({ id, delay }) => (
        <Snowflake key={id} delay={delay} options={options} />
      ))}
    </div>
  );
};

// Usage example:
/*
import { SnowfallEffect } from './components/SnowfallEffect';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <SnowfallEffect
        snowflakeCount={75}
        minSize={10}
        maxSize={30}
        minDuration={5}
        maxDuration={15}
        wind={200}
      />
      {/* Your content here *//*}
    </div>
  );
}
*/