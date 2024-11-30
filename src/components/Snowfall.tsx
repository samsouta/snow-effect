import { useMemo } from 'react';
import { Snowflake } from './Snowflake';
import '../styles/snowfall.css';

interface SnowfallProps {
  snowflakeCount?: number;
}

export const Snowfall = ({ snowflakeCount = 50 }: SnowfallProps) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: snowflakeCount }).map((_, index) => ({
      id: index,
      delay: (index * 0.2) % 5,
    }));
  }, [snowflakeCount]);

  return (
    <div className="snowfall-container">
      {snowflakes.map(({ id, delay }) => (
        <Snowflake key={id} delay={delay} />
      ))}
    </div>
  );
};