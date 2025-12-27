import React from 'react';
import '../styles/JoinScreen.css';

interface JoinScreenProps {
  username: string;
  room: string;
  onUsernameChange: (value: string) => void;
  onRoomChange: (value: string) => void;
  onJoin: () => void;
}

export default function JoinScreen({
  username,
  room,
  onUsernameChange,
  onRoomChange,
  onJoin,
}: JoinScreenProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onJoin();
    }
  };

  return (
    <div className="join-screen">
      <div className="join-container">
        <div className="join-header">
          <div className="wa-logo">
            <svg viewBox="0 0 24 24" width="80" height="80">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.67-.33-3.82-.91l-.27-.16-2.84.48.48-2.84-.16-.27A7.93 7.93 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"
              />
              <path
                fill="currentColor"
                d="M16.5 13.5c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"
              />
            </svg>
          </div>
          <h1>WhatsApp Chat</h1>
          <p>Connect with your team instantly</p>
        </div>

        <form onSubmit={handleSubmit} className="join-form">
          <div className="input-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="room">Room Name</label>
            <input
              id="room"
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => onRoomChange(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="join-button"
            disabled={!username.trim() || !room.trim()}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}
