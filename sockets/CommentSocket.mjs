export default function CommentSocket(io, socket) {
  // emits / broadcasts when comment is created/edited or deleted
  socket.on("commentAction", ({ action, postId, comment, commentId, updatedComment }) => {
    switch (action) {
      case "create":
        io.emit("commentCreated", { postId, comment });
        break;
      case "delete":
        io.emit("commentDeleted", { postId, commentId });
        break;
      case "edit":
        io.emit("commentEdited", { postId,  updatedComment });
        break;
    }
  });
}
