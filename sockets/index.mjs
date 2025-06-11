import LikeSocket from "./LikeSocket.mjs";
import CommentSocket from "./CommentSocket.mjs";

export default function registerSocketHandlers(io){
    io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    CommentSocket(io, socket);
    LikeSocket(io, socket);
    // notificationSocket(io, socket);
    // friendRequestSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}