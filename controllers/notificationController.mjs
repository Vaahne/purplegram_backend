import Notifications from "../models/Notifications.mjs";
import Users from "../models/Users.mjs";

async function updateNotification(req,res){
    try {
        const userId = req.user.id;

        let updatedNotification = await Notifications.updateMany({userId:userId},{$set:{read:true}});
        if(updatedNotification.modifiedCount > 0 )
            return res.status(201).json({message: `Updated Notification details`});
        res.status(404).json({errors:[{msg: `Something went wrong with Notification Detils`}]});   
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}
async function addNotification(req,res){
    
    let newNotification = await Notifications.insertOne(req.body);
    if(newNotification)
        return res.status(201).json({message: `Successfully registered`});
    return res.status(404).json({message: `Something went wrong . Please try later!!`});
}

async function deleteNotification(req,res) {
    const userId = req.user.id;
    const deletedNotification = await Notifications.deleteMany({userId:userId});
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deleteNotification)
        return res.status(200).json({message:`Notification deleted successfully`});
    return res.status(404).json({message:`Notification can't be deleted now`});
}

async function getNotification(req,res) {
    try {
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({errors:[{msg:'User not found!!'}]});

        const notifications = await Notifications.find({userId: userId,read:false})
                            .populate({
                                path: 'fromUserId',
                                select :'name photo'
                            }).sort({timestamp:-1}).limit(10);

        if(!notifications || notifications.length === 0)
            return res.status(200).json({msg:'You all caught up'});
        
        res.status(200).json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!!'}]});
    }
}

export default {updateNotification,addNotification,deleteNotification,getNotification};