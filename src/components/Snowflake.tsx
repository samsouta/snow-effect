import { motion } from 'framer-motion';
import { useWindowSize } from '../hooks/useWindowSize';
import { generateSnowflakeProps } from '../utils/snowflakeUtils';
import { SnowflakeProps } from '../types/snowfall';

export const Snowflake = ({ delay }: { delay: number }) => {
  const { width, height } = useWindowSize();
  const {
    initialX,
    initialY,
    finalX,
    duration,
    size,
    opacity,
    character
  } = generateSnowflakeProps(width);

  return (
    <motion.div
      className="snowflake absolute"
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
      }}
    >
      {character}
    </motion.div>
  );
};