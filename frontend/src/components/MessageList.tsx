import  { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import type { Message } from './MessageBubble';
import '../styles/MessageList.css';

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
  typingUser: string | null;
}

export default function MessageList({
  messages,
  currentUsername,
  typingUser,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp || msg.time).toLocaleDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: msgDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const formatDateSeparator = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="message-list" ref={containerRef} onScroll={handleScroll}>
      <div className="messages-container">
        {messageGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <div className="date-separator">
              <span>{formatDateSeparator(group.date)}</span>
            </div>
            {group.messages.map((msg, idx) => {
              return (
                <MessageBubble
                  key={msg.id || idx}
                  message={msg}
                  isOwn={msg.author === currentUsername}
                  isSystem={msg.author === 'system'}
                />
              );
            })}
          </div>
        ))}

        {typingUser && (
          <div className="typing-indicator">
            <div className="typing-avatar">
              {typingUser.charAt(0).toUpperCase()}
            </div>
            <div className="typing-bubble">
              <div className="typing-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <button className="scroll-to-bottom" onClick={() => scrollToBottom()}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
