export default function LikeSocket(io,socket){
    // emits/broadcasts when a like is toggled
    socket.on("likePost", ({ postId, userId,toggleLike }) => {
        io.emit("updateLikes", { postId, userId , toggleLike});
    });
}