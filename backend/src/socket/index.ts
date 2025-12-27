// backend/src/socket/index.ts
import { Server, Socket } from "socket.io";
import chatHandlers from "./chat.handlers.js";

export default function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    chatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
