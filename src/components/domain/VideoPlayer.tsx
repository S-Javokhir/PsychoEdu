import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  RotateCw,
  ShieldCheck
} from 'lucide-react';
import type { Video } from '../../types';

interface VideoPlayerProps {
  video: Video;
  currentTimestamp?: string;
  onMethodJump?: (timestamp: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  video, 
  currentTimestamp 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(145); // 02:25 default
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const controlsTimeoutRef = useRef<any>(null);

  // Parse duration "48:15" -> 2895 seconds
  const parseDuration = (dur: string): number => {
    if (!dur) return 1800;
    const parts = dur.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 1800;
  };

  const totalDurationSec = parseDuration(video.duration);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const clamped = Math.max(0, Math.min(totalDurationSec, secs));
    const m = Math.floor(clamped / 60);
    const s = Math.floor(clamped % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Jump to timestamp if external currentTimestamp changes
  useEffect(() => {
    if (currentTimestamp) {
      const secs = parseDuration(currentTimestamp);
      setCurrentTimeSec(secs);
      setIsPlaying(true);
    }
  }, [currentTimestamp]);

  // Video playback timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDurationSec, playbackSpeed]);

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

  // Controls auto-hide when playing
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

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

  // Keyboard navigation & accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentTimeSec(prev => Math.min(totalDurationSec, prev + 5));
      resetControlsTimeout();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentTimeSec(prev => Math.max(0, prev - 5));
      resetControlsTimeout();
    } else if (e.key === 'm') {
      e.preventDefault();
      toggleMute();
    } else if (e.key === 'f') {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  // Scrubber Hover tooltip calculations
  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = percent * totalDurationSec;
    setHoverTime(formatTime(targetSec));
    setHoverPosition(percent * 100);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTimeSec(percent * totalDurationSec);
    resetControlsTimeout();
  };

  const playedPercent = (currentTimeSec / totalDurationSec) * 100;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={resetControlsTimeout}
      onMouseEnter={() => setShowControls(true)}
      className={`relative select-none outline-none overflow-hidden bg-neutral-950 transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center rounded-none shadow-none'
          : 'w-full aspect-video rounded-card shadow-card border border-border-ui/60'
      }`}
    >
      {/* 1. Main Video Frame Layer */}
      <div 
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer"
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`w-full h-full ${
            isFullscreen ? 'object-contain max-h-screen' : 'object-cover'
          } transition-opacity duration-300 ${isPlaying ? 'opacity-90' : 'opacity-75'}`}
        />
        {/* Soft gradient shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. Top Bar (Protection Notice & Quality) */}
      <div 
        className={`absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs shadow-sm">
          <ShieldCheck className="w-4 h-4 text-teal-300" />
          <span className="font-medium">Faqat tomosha qilish (Himoyalangan amaliyot yozuvi)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-white/90 bg-black/65 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 shadow-sm">
            HD 1080p
          </span>
          {isFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="pointer-events-auto p-1.5 bg-black/65 backdrop-blur-md text-white rounded-lg border border-white/10 hover:bg-black/85 transition-colors"
              title="To‘liq ekrandan chiqish (Esc)"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Center Big Play Button (Guaranteed Centering Overlay) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <button
            type="button"
            onClick={togglePlay}
            className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-deep-teal/90 hover:bg-teal-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 border-2 border-white/20"
            aria-label="Videoni ijro etish"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1 text-white" />
          </button>
        </div>
      )}

      {/* 4. Bottom Control Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-8 pb-3.5 px-4 sm:px-6 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Timeline / Scrubber */}
        <div
          onClick={handleTimelineClick}
          onMouseMove={handleTimelineMouseMove}
          onMouseLeave={() => setHoverTime(null)}
          className="relative mb-3 flex items-center cursor-pointer group/timeline h-4"
        >
          {/* Track Background */}
          <div className="w-full h-1.5 group-hover/timeline:h-2.5 bg-white/25 rounded-full overflow-hidden transition-all relative">
            {/* Played Bar */}
            <div
              className="h-full bg-teal-400 rounded-full relative transition-all"
              style={{ width: `${playedPercent}%` }}
            />
          </div>

          {/* Scrubber Knob */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/timeline:scale-100 transition-transform pointer-events-none border border-teal-600"
            style={{ left: `calc(${playedPercent}% - 7px)` }}
          />

          {/* Hover Time Tooltip */}
          {hoverTime && (
            <div
              className="absolute -top-7 -translate-x-1/2 bg-black/90 text-white font-mono text-[11px] px-2 py-0.5 rounded shadow-lg border border-white/10 pointer-events-none"
              style={{ left: `${hoverPosition}%` }}
            >
              {hoverTime}
            </div>
          )}
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-white text-xs">
          {/* Left Actions: Play/Pause, Rewind/Forward, Volume, Time */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="hover:text-teal-300 transition-colors p-1.5 focus:outline-none"
              aria-label={isPlaying ? 'Pauza' : 'Ijro etish'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white" />
              )}
            </button>

            {/* 10s Rewind */}
            <button
              type="button"
              onClick={() => {
                setCurrentTimeSec(prev => Math.max(0, prev - 10));
                resetControlsTimeout();
              }}
              className="hover:text-teal-300 transition-colors p-1 hidden sm:block"
              title="10 soniya orqaga"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* 10s Forward */}
            <button
              type="button"
              onClick={() => {
                setCurrentTimeSec(prev => Math.min(totalDurationSec, prev + 10));
                resetControlsTimeout();
              }}
              className="hover:text-teal-300 transition-colors p-1 hidden sm:block"
              title="10 soniya oldinga"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume & Slider */}
            <div className="flex items-center gap-2 group/volume">
              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-teal-300 transition-colors p-1"
                aria-label={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-teal-300" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-teal-400 focus:outline-none"
                aria-label="Ovoz balandligi"
              />
            </div>

            {/* Time Readout */}
            <span className="font-mono text-[11px] sm:text-xs text-white/90">
              {formatTime(currentTimeSec)} <span className="text-white/40">/</span> {video.duration}
            </span>
          </div>

          {/* Right Actions: Speed & Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1">
              <select
                value={playbackSpeed}
                onChange={(e) => {
                  setPlaybackSpeed(Number(e.target.value));
                  resetControlsTimeout();
                }}
                className="bg-black/60 text-white text-xs rounded border border-white/20 px-2 py-1 focus:outline-none cursor-pointer hover:border-teal-400 transition-colors font-mono"
                aria-label="Ijro tezligi"
              >
                <option value={0.75} className="bg-neutral-900 text-white">0.75x</option>
                <option value={1} className="bg-neutral-900 text-white">1.0x</option>
                <option value={1.25} className="bg-neutral-900 text-white">1.25x</option>
                <option value={1.5} className="bg-neutral-900 text-white">1.5x</option>
                <option value={2} className="bg-neutral-900 text-white">2.0x</option>
              </select>
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hover:text-teal-300 transition-colors p-1.5 focus:outline-none rounded hover:bg-white/10"
              aria-label={isFullscreen ? 'Kichik ekran' : 'To‘liq ekran'}
              title={isFullscreen ? 'To‘liq ekrandan chiqish (F yoki Esc)' : 'To‘liq ekran (F)'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
