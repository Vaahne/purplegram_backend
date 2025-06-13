export default function FriendreqSocket(io,socket){
    // emits/broadcasts when a like is toggled
   socket.on("sendFriendRequest", ({ senderId, receiverId }) => {
        // Notify only the receiver about the request
        io.to(receiverId).emit("newFriendRequest", { senderId, receiverId });

        // Broadcast to sender so they see the request status
        io.to(senderId).emit("friendRequestSent", { senderId, receiverId });
    });

    socket.on("acceptFriendRequest", ({ senderId, receiverId }) => {
        // Notify both users about the confirmed friendship
        io.to(senderId).emit("friendRequestAccepted", { senderId, receiverId });
        io.to(receiverId).emit("friendRequestAccepted", { senderId, receiverId });
    });

    socket.on("friendRequestDeclined", ({ senderId }) => {
        console.log(`Friend request declined by ${senderId}`);
    });
}