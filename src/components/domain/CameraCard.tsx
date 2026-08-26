import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Clock, User, Eye, ShieldAlert, WifiOff, Disc, Info } from 'lucide-react';
import type { Camera } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CameraStatusBadge } from '../status/CameraStatusBadge';

interface CameraCardProps {
  camera: Camera;
}

export const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const isProfessor = role === 'professor_psychologist';

  const isLive = camera.state === 'Live' || camera.state === 'Recording';
  const hasSession = !!camera.activeSessionId;

  const handleWatch = () => {
    if (camera.activeSessionId) {
      navigate(`/live/${camera.activeSessionId}`);
    } else {
      navigate(`/live`);
    }
  };

  const handleStartSession = () => {
    navigate(`/professor/recording`);
  };

  return (
    <Card padded="none" className="overflow-hidden flex flex-col group hover:border-teal-300">
      {/* Video Preview Box */}
      <div className="relative aspect-video bg-text-main/90 flex items-center justify-center overflow-hidden">
        {/* Subtle camera room background preview */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${
              camera.floor === 1
                ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80'
            })`
          }}
        />

        {/* State Badge Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <CameraStatusBadge state={camera.state} size="sm" />
        </div>

        {/* Room badge Top Right */}
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md border border-white/10">
          {camera.roomNumber} ({camera.floor}-qavat)
        </div>

        {/* Center state info if offline/error */}
        {camera.state === 'Offline' && (
          <div className="z-10 flex flex-col items-center text-white/70 text-xs gap-1">
            <WifiOff className="w-6 h-6 text-gray-400" />
            <span>Kamera o‘chirilgan</span>
          </div>
        )}
        {camera.state === 'Stream Error' && (
          <div className="z-10 flex flex-col items-center text-rose-300 text-xs gap-1 text-center px-4">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <span>Signal yo‘qolgan</span>
          </div>
        )}
        {camera.state === 'Preparing' && (
          <div className="z-10 flex flex-col items-center text-teal-200 text-xs gap-1">
            <Video className="w-6 h-6 text-teal-300 animate-subtle-pulse" />
            <span>Tayyorlanmoqda...</span>
          </div>
        )}

        {/* Bottom stream overlay if live */}
        {isLive && (
          <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white/90">
            <span className="font-mono">{camera.resolution} • {camera.fps}fps</span>
            {camera.startedAt && (
              <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded">
                <Clock className="w-3 h-3 text-sage" /> {camera.startedAt}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h4 className="text-sm font-semibold text-text-main group-hover:text-deep-teal transition-colors">
              {camera.roomNumber} — {camera.name}
            </h4>
          </div>

          <p className="text-xs text-text-muted mb-3 line-clamp-1">
            {camera.currentActivity || 'Hozirda faol seans mavjud emas'}
          </p>

          <div className="space-y-1.5 text-xs text-text-muted mb-4">
            {camera.currentProfessor && (
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-text-soft shrink-0" />
                <span className="text-text-main font-medium">{camera.currentProfessor}</span>
              </div>
            )}
            {camera.patientCode && (
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-text-soft">Anonim ID:</span>
                <span className="font-mono bg-sage-light text-teal-900 px-1.5 py-0.2 rounded font-medium">
                  {camera.patientCode}
                </span>
              </div>
            )}
            {isProfessor && !camera.currentProfessor && (
              <div className="flex items-center gap-2 text-[11px] text-teal-800">
                <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Xona bo‘sh va seans uchun tayyor</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border-ui flex items-center gap-2">
          {isLive && hasSession ? (
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              icon={<Eye className="w-3.5 h-3.5" />}
              onClick={handleWatch}
            >
              Kuzatish
            </Button>
          ) : isProfessor && (camera.state === 'Online' || camera.state === 'Preparing') ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center text-xs font-semibold"
              icon={<Disc className="w-3.5 h-3.5 text-rose-600" />}
              onClick={handleStartSession}
            >
              Seansni boshlash
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center text-text-muted"
              disabled={!isLive}
              onClick={handleWatch}
            >
              {isLive ? 'Kuzatish' : 'Efir kutilmoqda'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
