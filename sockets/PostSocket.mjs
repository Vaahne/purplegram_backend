export default function PostSocket(io,socket){
     socket.on("deletePost",  postId  => {
        io.emit("postDeleted",  postId);
    });
}