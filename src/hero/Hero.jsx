import React, { useRef, useState } from 'react';
import { Music, Play, Pause } from 'lucide-react';

export const Hero = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      className="relative h-screen min-w-full flex items-center justify-center text-white text-center overflow-hidden"
  style={{ backgroundImage: "url('/img/2.jpg')", backgroundSize: "cover", backgroundPosition: "center", }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hebrew Text */}
      <div className="absolute top-6 right-8 z-20">
        <span 
          className="text-lg font-normal text-white opacity-85 block mb-4"
          style={{
            fontFamily: 'Georgia, serif',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
            direction: 'rtl'
          }}
        >
          ב״ה
        </span>
        
        {/* Music Player Button */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 rounded-xl px-4 py-2 bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-md backdrop-blur-sm"
        >
          <Music className="w-4 h-4" />
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm hidden sm:block">
            {isPlaying ? 'Pausar' : 'Música'}
          </span>
        </button>
        <audio ref={audioRef} src="/audio/L-O-V-E.mp3" loop />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl px-6">
        {/* Names Container */}
        <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-normal m-0"
            style={{
              fontFamily: 'Playfair Display, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Flor
          </h1>
          <span 
            className="text-5xl md:text-6xl lg:text-7xl leading-none mt-2"
            style={{
              fontFamily: 'Great Vibes, cursive'
            }}
          >
            &
          </span>
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-normal m-0"
            style={{
              fontFamily: 'Playfair Display, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Nico
          </h1>
        </div>

        {/* Wedding Date */}
        <p 
          className="text-2xl md:text-3xl mb-4 italic"
          style={{
            fontFamily: 'Playfair Display, serif'
          }}
        >
          20 de Noviembre, 2025
        </p>

        {/* Wedding Tagline */}
        <p 
          className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto"
          style={{
            fontFamily: 'Playfair Display, serif'
          }}
        >
          Nos casamos y queremos que seas parte de nuestra historia
        </p>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .flex-wrap > h1 {
            font-size: 2.8rem !important;
          }
          .flex-wrap > span {
            font-size: 2.5rem !important;
          }
          .flex-wrap {
            flex-direction: column;
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .flex-wrap > h1 {
            font-size: 2rem !important;
          }
          .flex-wrap > span {
            font-size: 2rem !important;
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap');
      `}</style>
    </section>
  );
}