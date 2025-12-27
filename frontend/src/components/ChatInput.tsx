import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatInput.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onTyping: () => void;
}

export default function ChatInput({ onSendMessage, onTyping }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Trigger typing indicator
    onTyping();

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <button className="icon-button emoji-button" title="Emoji">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
          />
        </svg>
      </button>

      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="message-input"
          placeholder="Type a message"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
      </div>

      <button
        className={`send-button ${message.trim() ? 'active' : ''}`}
        onClick={handleSend}
        disabled={!message.trim()}
        title="Send"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
          />
        </svg>
      </button>
    </div>
  );
}
