export default function CommentSocket(io, socket) {
  socket.on("commentAction", ({ action, postId, comment, commentId, updatedText }) => {
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
