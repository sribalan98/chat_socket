import React from 'react';
import '../styles/MessageBubble.css';

export interface Message {
  id?: string;
  author: string;
  message: string;
  time: string;
  timestamp?: string;
  status?: 'sent' | 'delivered' | 'read';
  room?: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  isSystem?: boolean;
}

export default function MessageBubble({
  message,
  isOwn,
  isSystem = false,
}: MessageBubbleProps) {
  if (isSystem) {
    return (
      <div className="message-system">
        <span>{message.message}</span>
      </div>
    );
  }

  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return timeStr;
    }
  };

  return (
    <div className={`message-wrapper ${isOwn ? 'own' : 'other'}`}>
      <div className={`message-bubble ${isOwn ? 'sent' : 'received'}`}>
        {!isOwn && <div className="message-author">{message.author}</div>}
        <div className="message-content">
          <span className="message-text">{message.message}</span>
          <div className="message-meta">
            <span className="message-time">
              {formatTime(message.timestamp || message.time)}
            </span>
            {isOwn && (
              <span className="message-status">
                {message.status === 'read' && (
                  <svg viewBox="0 0 16 15" width="16" height="15" className="read">
                    <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                  </svg>
                )}
                {message.status === 'delivered' && (
                  <svg viewBox="0 0 16 15" width="16" height="15">
                    <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                  </svg>
                )}
                {message.status === 'sent' && (
                  <svg viewBox="0 0 12 11" width="12" height="11">
                    <path fill="currentColor" d="M11.1 2.3L9.8 1c-.2-.2-.5-.2-.7 0L4.4 5.7c-.1.1-.3.1-.4 0L1.4 3.1c-.2-.2-.5-.2-.7 0L.1 3.7c-.2.2-.2.5 0 .7l3.3 3.2c.1.1.3.1.4 0L11.1 3c.2-.2.2-.5 0-.7z"/>
                  </svg>
                )}
              </span>
            )}
          </div>
        </div>
        <div className={`message-tail ${isOwn ? 'sent' : 'received'}`}></div>
      </div>

    </div>
  );
}
