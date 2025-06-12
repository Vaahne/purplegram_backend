import LikeSocket from "./LikeSocket.mjs";
import CommentSocket from "./CommentSocket.mjs";
import PostSocket from "./PostSocket.mjs";
import NotificationSocket from "./NotificationSocket.mjs";

export default function registerSocketHandlers(io){
  
    io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    
    const userId = socket.handshake.query.userId;
    if (userId) {
      socket.join(userId); // Join room by userId for targeted emissions
    }

    CommentSocket(io, socket);
    LikeSocket(io, socket);
    PostSocket(io,socket);
    NotificationSocket(io, socket);
    // friendRequestSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}