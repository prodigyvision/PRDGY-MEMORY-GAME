
import React, { useEffect, useState } from 'react';

interface LevelAnnouncerProps {
  level: number;
}

const LevelAnnouncer: React.FC<LevelAnnouncerProps> = ({ level }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className={`transition-all duration-1000 transform ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="text-center">
          <span className="text-[#E50914] text-xl font-bold tracking-[0.5em] mb-4 block animate-pulse">STAGE {level}</span>
          <h2 className="text-7xl md:text-9xl font-black text-white italic tracking-tighter">
            PREPARE<span className="text-red-600">.</span>
          </h2>
          <div className="mt-8 h-1 w-64 bg-white/10 mx-auto relative overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0 bg-[#E50914] animate-[loading_2s_ease-in-out_forwards]"></div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LevelAnnouncer;
