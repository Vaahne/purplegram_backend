import FriendReqs from "../models/FriendRequest.mjs";
import Users from "../models/Users.mjs";

async function updateFriendReq(req,res){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const sender_id = req.params.sender_id;
        user = await Users.findById({_id:sender_id});
        if(!user) return res.status(404).json({errors:[{msg:'Receiver user not found'}]});

        let friend_req = FriendReqs.findOne({sender_id: sender_id, receiver_id:userId});

        if(!friend_req) return res.status(404).json({errors:[{msg:'Friend Request Not found!!'}]});
        
        const status = req.params.status;
        friend_req.status = status;

        await friend_req.save();
        // if it is accepted , after changing the status , adding each other in friends list.
        if(status == 'Accepted'){
            await Users.updateOne({_id:userId},
                                  {
                                    $addToSet: {friends: sender_id}
                                  });
                                  
            await Users.updateOne({_id:sender_id},
                                  {
                                    $addToSet: {friends: userId}
                                  });
        }
            
        res.status(200).json({msg:'Friend Request status updated!!'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}

async function addFriendReq(req,res){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const receiverId = req.params.receiverId;
        user = await Users.findById({_id:receiverId});
        if(!user) return res.status(404).json({errors:[{msg:'Receiver User not found'}]});

        const friend_req = new FriendReqs({
            sender_id: userId,
            receiver_id: receiverId
        });

        await friend_req.save();
        res.status(201).json({msg: 'Friend Request sent successfully!!!'});
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}

async function deleteFriendReq(req,res) {
    
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }
    
    
    const friendReqId= req.params.friendReqId;
    const deletedFriendReq = await FriendReqs.findOneAndDelete(friendReqId);
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deleteFriendReq)
        return res.status(200).json({message:`FriendReq deleted successfully`});
    return res.status(404).json({message:`FriendReq can't be deleted now`});
}
async function getFriendReq(req,res) {
    try {
        const userId = req.user.id;
        
        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({errors:[{msg:'User not found!!'}]});
        
        const friendReqs = await FriendReqs.find({receiver_id: userId, read: false,status: 'pending'})
                                            .populate({
                                                path: 'sender_id',
                                                select: 'name'
                                            }).select('sender_id');

        if(!friendReqs || friendReqs.length == 0) 
            return res.status(404).json({errors:[{msg:'No friend requests'}]});

        return res.status(200).json(friendReqs);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
    const friendReqId = req.params.friendReqId;
    const friendReq = await FriendReqs.findOne({friendReqId});
    if(friendReq)
        res.status(200).json(friendReq);
}

export default {updateFriendReq,addFriendReq,deleteFriendReq,getFriendReq};