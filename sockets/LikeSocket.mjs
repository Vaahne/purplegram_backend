export default function LikeSocket(io,socket){
    socket.on("likePost", ({ postId, userId,toggleLike }) => {
        io.emit("updateLikes", { postId, userId , toggleLike});
    });
}