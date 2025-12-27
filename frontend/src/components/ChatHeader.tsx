import React from 'react';
import '../styles/ChatHeader.css';

interface ChatHeaderProps {
  room: string;
  onlineUsers: number;
}

export default function ChatHeader({ room, onlineUsers }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="room-avatar">
          {room.charAt(0).toUpperCase()}
        </div>
        <div className="room-info">
          <h2 className="room-name">{room}</h2>
          <p className="room-status">
            {onlineUsers} {onlineUsers === 1 ? 'member' : 'members'} online
          </p>
        </div>
      </div>
      <div className="header-actions">
        <button className="icon-button" title="Search">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <button className="icon-button" title="More options">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
