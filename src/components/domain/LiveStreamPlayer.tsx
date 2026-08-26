import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Radio, Eye, Shield } from 'lucide-react';
import type { LiveSession } from '../../types';

interface LiveStreamPlayerProps {
  session: LiveSession;
}

export const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ session }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Native fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isDocFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isDocFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else {
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-neutral-950 overflow-hidden select-none ${
        isFullscreen
          ? 'fixed inset-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center rounded-none shadow-none'
          : 'w-full aspect-video rounded-card shadow-card border border-border-ui/60'
      }`}
    >
      {/* Video stream simulation container */}
      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
        {/* Background room imagery */}
        <div
          className={`absolute inset-0 bg-cover bg-center ${isFullscreen ? 'opacity-75' : 'opacity-65'}`}
          style={{
            backgroundImage: `url(${
              session.roomNumber.includes('203')
                ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&auto=format&fit=crop&q=80'
            })`
          }}
        />

        {/* Ambient calm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

        {/* Center Live Feed Watermark */}
        <div className="z-10 text-center pointer-events-none select-none">
          <div className="inline-flex items-center gap-2 bg-black/65 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              JONLI AMALIYOT EFIRI
            </span>
          </div>
          <p className="text-white/80 text-xs font-mono">
            {session.roomNumber} • Kamera #1 • 1080p@30fps
          </p>
        </div>
      </div>

      {/* Top Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Live status badge */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
            <Radio className="w-3.5 h-3.5" />
            <span>JONLI EFIR</span>
          </div>

          <div className="bg-black/65 backdrop-blur-md text-white/90 text-xs px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-sage" />
            <span>{session.viewerCount} ta kuzatuvchi</span>
          </div>
        </div>

        {/* Watch-only security notice */}
        <div className="hidden sm:flex items-center gap-1.5 bg-black/65 backdrop-blur-md text-white/80 text-xs px-3 py-1 rounded-md border border-white/10">
          <Shield className="w-3.5 h-3.5 text-teal-300" />
          <span>Talaba rejimi: Faqat kuzatish</span>
        </div>
      </div>

      {/* Bottom Controls Bar Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/80 hover:text-white transition-colors p-1"
            title={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sage" />}
          </button>
          <div className="text-xs text-white/80 font-mono hidden sm:block">
            Seans vaqti: <span className="text-white font-medium">{session.startedAt}</span> dan buyon
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-white/70 bg-white/10 px-2 py-0.5 rounded font-mono">
            HD 1080p
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="text-white/80 hover:text-white transition-colors p-1"
            title={isFullscreen ? 'Kichik ekran' : 'To‘liq ekran'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
