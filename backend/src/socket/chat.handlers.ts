// backend/src/socket/chat.handlers.ts
import { Server, Socket } from "socket.io";
import { randomUUID } from "crypto";

interface UserData {
  socketId: string;
  username: string;
  room: string;
  online: boolean;
}

// Store connected users per room
const roomUsers = new Map<string, Map<string, UserData>>();

export default function chatHandlers(io: Server, socket: Socket) {
  socket.on("join_room", ({ room, username }) => {
    socket.join(room);

    // Track user in room
    if (!roomUsers.has(room)) {
      roomUsers.set(room, new Map());
    }
    roomUsers.get(room)!.set(socket.id, {
      socketId: socket.id,
      username,
      room,
      online: true,
    });

    // Notify others that user joined
    socket.to(room).emit("user_joined", {
      username,
      timestamp: new Date().toISOString(),
    });

    // Send current user list to the joining user
    const users = Array.from(roomUsers.get(room)!.values()).map((u) => ({
      username: u.username,
      online: u.online,
    }));
    socket.emit("room_users", users);

    // Broadcast updated user list to room
    io.to(room).emit("user_list_updated", users);
  });

  socket.on("send_message", (data) => {
    // Generate unique message ID
    const messageId = randomUUID();
    const messageData = {
      ...data,
      id: messageId,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    // Emit to others in room (delivered)
    socket.to(data.room).emit("receive_message", {
      ...messageData,
      status: "delivered",
    });

    // Confirm to sender
    socket.emit("message_sent", {
      id: messageId,
      status: "delivered",
    });
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("typing", { username, timestamp: Date.now() });
  });

  socket.on("stop_typing", ({ room, username }) => {
    socket.to(room).emit("stop_typing", username);
  });

  socket.on("message_read", ({ messageId, room }) => {
    socket.to(room).emit("message_read", { messageId });
  });

  socket.on("disconnect", () => {
    // Find and remove user from all rooms
    roomUsers.forEach((users, room) => {
      const user = users.get(socket.id);
      if (user) {
        users.delete(socket.id);

        // Notify room that user left
        socket.to(room).emit("user_left", {
          username: user.username,
          timestamp: new Date().toISOString(),
        });

        // Broadcast updated user list
        const updatedUsers = Array.from(users.values()).map((u) => ({
          username: u.username,
          online: u.online,
        }));
        io.to(room).emit("user_list_updated", updatedUsers);

        // Clean up empty rooms
        if (users.size === 0) {
          roomUsers.delete(room);
        }
      }
    });
  });
}
