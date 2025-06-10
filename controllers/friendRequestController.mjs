import FriendRequest from "../models/FriendRequest.mjs";
import Users from "../models/Users.mjs";

async function updateFriendReq(req,res){
    try {
        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const sender_id = req.params.sender_id;
        const senderUser = await Users.findById({_id:sender_id});
        if(!senderUser) return res.status(404).json({errors:[{msg:'Receiver user not found'}]});

        let friend_req = await FriendRequest.findOne({sender_id: sender_id, receiver_id:userId});

        if(!friend_req) return res.status(404).json({errors:[{msg:'Friend Request Not found!!'}]});
        
        const status = req.body.status;
        friend_req.status = status;

        await friend_req.save();

        console.log("After saveing the friend req \n");
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
        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const receiverId = req.params.receiverId;
        user = await Users.findById({_id:receiverId});

        if(!user) return res.status(404).json({errors:[{msg:'Receiver User not found'}]});
        console.log("hello before friendRequest setup\n");
        const friendRequest = await FriendRequest.findOne({
            $or: [
                {sender_id: userId, receiver_id: receiverId},
                {sender_id:receiverId, receiver_id: userId}
            ]            
        });
        console.log("hello before if\n");
        if(friendRequest ){
            const status = friendRequest.status;
            if( status == 'Pending')
                return res.status(200).json({msg:'Friend Request already sent'});
            if( status == 'Rejected'){
                friendRequest.status = 'Pending';
                await friendRequest.save();
                return res.staus(200).json({msg:'Friend Request sent!!'});
            }
        }

        const friend_req = new FriendRequest({
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

        // Todo

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }
    
    
    const friendReqId= req.params.friendReqId;
    const deletedFriendReq = await FriendRequest.findOneAndDelete(friendReqId);
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
        
        const friendReqs = await FriendRequest.find({receiver_id: userId, read: false,status: 'Pending'})
                                            .populate({
                                                path: 'sender_id',
                                                select: 'name photo'
                                            }).select('sender_id');

        if(!friendReqs || friendReqs.length == 0) 
            return res.status(200).json({msg:'No friend requests'});

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

async function updateFeild(req,res){
    try {
        // const result = await FriendRequest.updateMany({notification_type:{$exists : true}},
        //                     {$rename: {notification_type:"status"}});

         const result = await FriendRequest.updateMany(
            { notification_type: { $exists: true } },  // Find documents with the field
            { $set: { status: "$notification_type" }, $unset: { notification_type: "" } } // Rename field properly
        );

        console.log(result);
        console.log(`${result.modifiedCount} updated!!`);
        res.json({msg:"updated"});
    } catch (err) {
        console.error(err.message);
    }
}

export default {updateFriendReq,addFriendReq,deleteFriendReq,getFriendReq,updateFeild};