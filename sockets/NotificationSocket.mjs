export default function NotificationSocket(io,socket){

    socket.on("addNotification", ({ postId, userId, friends }) => {
    // Loop through each friend and emit only if they are online (i.e., joined their room)
    friends.forEach(friendId => {
      // Emit only if friend is connected (joined their room via socket.join)
      io.to(friendId).emit("newNotification", {
        postId,
        from: userId,
      });
    });
  });
    // socket.on("addNotification", ({ postId, userId }) => {
    //     io.emit("newNotification", { postId, userId });
    // });
}