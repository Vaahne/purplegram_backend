import FriendReqs from "../models/FriendRequest.mjs";

async function updateFriendReq(req,res){
    let updatedFriendReq = await FriendReqs.findByIdAndUpdate(req.params.friendReqId, req.body);
    if(updatedFriendReq)
        return res.status(201).json({message: `Updated FriendReq details`});
    return res.status(404).json({message: `Something went wrong with FriendReq Detils`});
}
async function addFriendReq(req,res){
    
    let newFriendReq = await FriendReqs.insertOne(req.body);
    if(newFriendReq)
        return res.status(201).json({message: `Successfully registered`});
    return res.status(404).json({message: `Something went wrong . Please try later!!`});
}

async function deleteFriendReq(req,res) {
    const friendReqId= req.params.friendReqId;
    const deletedFriendReq = await FriendReqs.findOneAndDelete(friendReqId);
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deleteFriendReq)
        return res.status(200).json({message:`FriendReq deleted successfully`});
    return res.status(404).json({message:`FriendReq can't be deleted now`});
}
async function getFriendReq(req,res) {
    const friendReqId = req.params.friendReqId;
    const friendReq = await FriendReqs.findOne({friendReqId});
    if(friendReq)
        res.status(200).json(friendReq);
}

export default {updateFriendReq,addFriendReq,deleteFriendReq,getFriendReq};