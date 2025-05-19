import Notifications from "../models/Notifications.mjs";

async function updateNotification(req,res){
    
    let updatedNotification = await Notifications.findByIdAndUpdate(req.params.notificationId, req.body);
    if(updatedNotification)
        return res.status(201).json({message: `Updated Notification details`});
    return res.status(404).json({message: `Something went wrong with Notification Detils`});
}
async function addNotification(req,res){
  
    let newNotification = await Notifications.insertOne(req.body);
    if(newNotification)
        return res.status(201).json({message: `Successfully registered`});
    return res.status(404).json({message: `Something went wrong . Please try later!!`});
}

async function deleteNotification(req,res) {
    const notificationId= req.params.notificationId;
    const deletedNotification = await Notifications.findOneAndDelete(notificationId);
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deleteNotification)
        return res.status(200).json({message:`Notification deleted successfully`});
    return res.status(404).json({message:`Notification can't be deleted now`});
}
async function getNotification(req,res) {
    const notificationId = req.params.notificationId;
    const notification = await Notifications.findOne({notificationId});
    if(notification)
        res.status(200).json(notification);
}

export default {updateNotification,addNotification,deleteNotification,getNotification};