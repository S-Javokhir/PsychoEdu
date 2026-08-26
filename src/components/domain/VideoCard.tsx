import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Eye, Sparkles } from 'lucide-react';
import type { Video } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();

  return (
    <Card
      padded="none"
      className="overflow-hidden flex flex-col group cursor-pointer hover:border-teal-300 transition-all duration-200"
      onClick={() => navigate(`/videos/${video.id}`)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-text-main/90 overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play Icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-deep-teal/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <Badge variant="sage" size="sm" className="bg-white/90 text-deep-teal font-medium backdrop-blur-xs">
            {video.activityType}
          </Badge>
          <span className="bg-black/70 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
            <Clock className="w-3 h-3 text-sage" />
            {video.duration}
          </span>
        </div>

        {/* Method Badge Bottom */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="text-[11px] font-medium text-white/95 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 border border-white/10">
            <Sparkles className="w-3 h-3 text-teal-300" />
            {video.method}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold text-text-main group-hover:text-deep-teal transition-colors line-clamp-2 mb-2 leading-snug">
            {video.title}
          </h4>
          <p className="text-xs text-text-muted line-clamp-2 mb-3">
            {video.description}
          </p>
        </div>

        <div className="pt-3 border-t border-border-ui flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar src={video.professorAvatar} name={video.professor} size="xs" />
            <span className="text-xs font-medium text-text-main truncate max-w-[130px]">
              {video.professor}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-text-soft" />
              {video.viewCount}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
