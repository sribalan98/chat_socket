import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import JoinScreen from './components/JoinScreen';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import type { Message } from './components/MessageBubble';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // Clear typing timeout on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const joinRoom = () => {
    if (!username.trim() || !room.trim()) return;

    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.emit('join_room', { room, username });

    // Handle incoming messages
    socket.on('receive_message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    // Handle message sent confirmation
    socket.on('message_sent', ({ id, status }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );
    });

    // Handle user joined
    socket.on('user_joined', ({ username: u, timestamp }) => {
      setMessages((prev) => [
        ...prev,
        {
          author: 'system',
          message: `${u} joined the chat`,
          time: new Date(timestamp).toLocaleTimeString(),
          timestamp,
        },
      ]);
    });

    // Handle user left
    socket.on('user_left', ({ username: u, timestamp }) => {
      setMessages((prev) => [
        ...prev,
        {
          author: 'system',
          message: `${u} left the chat`,
          time: new Date(timestamp).toLocaleTimeString(),
          timestamp,
        },
      ]);
    });

    // Handle room users list
    socket.on('room_users', (users: { username: string; online: boolean }[]) => {
      setOnlineUsers(users.length);
    });

    // Handle user list updates
    socket.on('user_list_updated', (users: { username: string; online: boolean }[]) => {
      setOnlineUsers(users.length);
    });

    // Handle typing indicator
    socket.on('typing', ({ username: typingName }) => {
      if (typingName !== username) {
        setTypingUser(typingName);

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          setTypingUser(null);
        }, 3000);
      }
    });

    socket.on('stop_typing', (typingName: string) => {
      if (typingName !== username) {
        setTypingUser(null);
      }
    });

    setJoined(true);
  };

  const sendMessage = (messageText: string) => {
    if (!messageText.trim() || !socketRef.current) return;

    // Stop typing indicator when sending message
    handleStopTyping();

    const msg: Message = {
      id: crypto.randomUUID(),
      room,
      author: username,
      message: messageText,
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    socketRef.current.emit('send_message', msg);
    setMessages((prev) => [...prev, msg]);
  };

  const handleTyping = () => {
    if (!socketRef.current) return;

    // Emit typing event
    socketRef.current.emit('typing', { room, username });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 2000);
  };

  const handleStopTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit('stop_typing', { room, username });
    }
    
    // Clear the timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  if (!joined) {
    return (
      <JoinScreen
        username={username}
        room={room}
        onUsernameChange={setUsername}
        onRoomChange={setRoom}
        onJoin={joinRoom}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="chat-window">
        <ChatHeader room={room} onlineUsers={onlineUsers} />
        <MessageList
          messages={messages}
          currentUsername={username}
          typingUser={typingUser}
        />
        <ChatInput onSendMessage={sendMessage} onTyping={handleTyping} />
      </div>
    </div>
  );
}

export default App;
