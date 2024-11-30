import React from 'react';
import { Snowfall } from './components/Snowfall';
import Experience from './components/Experience';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 relative">
      <Snowfall snowflakeCount={75} />
      <div className="relative z-10">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Winter Wonderland
          </h1>
          <p className="text-xl text-blue-200">
            Watch the snow fall gently...
          </p>
        </div>
        <Experience />
      </div>
    </div>
  );
}

export default App;