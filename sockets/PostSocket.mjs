export default function PostSocket(io,socket){
    // emits when a post is deleted
     socket.on("deletePost",  postId  => {
        io.emit("postDeleted",  postId);
    });

    socket.on("postUpdated", ({ postId, updatedPost }) => {
        io.emit("updated",postId);
        // setPosts(prev => prev.map(p => p._id === postId ? updatedPost : p));
    });

}