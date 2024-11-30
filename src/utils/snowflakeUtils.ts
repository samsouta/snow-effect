const SNOWFLAKE_CHARACTERS = ['❅', '❆', '❄', '❉'];

export const generateSnowflakeProps = (screenWidth: number) => {
  const initialX = Math.random() * screenWidth;
  const drift = (Math.random() - 0.5) * 200;
  const finalX = initialX + drift;
  
  return {
    initialX,
    initialY: -20,
    finalX,
    duration: 5 + Math.random() * 10,
    size: 10 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.7,
    character: SNOWFLAKE_CHARACTERS[Math.floor(Math.random() * SNOWFLAKE_CHARACTERS.length)],
  };
};