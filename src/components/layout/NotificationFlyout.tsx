import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Radio, FileText, Video, FolderGit2 } from 'lucide-react';
import { mockNotifications } from '../../data/notifications';
import type { NotificationItem } from '../../types';

interface NotificationFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationFlyout: React.FC<NotificationFlyoutProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'live':
        return <Radio className="w-3.5 h-3.5 text-emerald-600" />;
      case 'material':
        return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case 'video':
        return <Video className="w-3.5 h-3.5 text-teal-600" />;
      case 'case':
        return <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-gray-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 w-80 sm:w-96 bg-surface border border-border-ui rounded-card shadow-dropdown z-50 overflow-hidden animate-page-enter">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border-ui bg-page flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-text-main">Xabarnomalar</h4>
            {unreadCount > 0 && (
              <span className="text-[11px] bg-teal-100 text-teal-800 font-semibold px-2 py-0.2 rounded-full">
                {unreadCount} ta yangi
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs text-text-muted hover:text-deep-teal flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>O‘qilgan deb belgilash</span>
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-border-ui">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-text-muted">
              Xabarnomalar mavjud emas
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3.5 hover:bg-sage-light/50 transition-colors cursor-pointer flex gap-3 ${
                  !notif.isRead ? 'bg-teal-50/40' : ''
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-surface border border-border-ui flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-xs font-semibold text-text-main truncate">
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-text-soft whitespace-nowrap">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
                {!notif.isRead && (
                  <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-border-ui bg-page/40 text-center">
          <span className="text-[11px] text-text-muted">
            Universitet psixologiya xabarlari
          </span>
        </div>
      </div>
    </>
  );
};
