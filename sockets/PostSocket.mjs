export default function PostSocket(io,socket){
    // emits when a post is deleted
     socket.on("deletePost",  postId  => {
        io.emit("postDeleted",  postId);
    });
}