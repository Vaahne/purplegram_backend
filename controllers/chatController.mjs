import Chats from "../models/Chats.mjs";
import Users from "../models/Users.mjs";

async function getMessages(req,res){
    try {
        const userId = req.user.id;
        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const friendId = req.params.friendId;
        const friend = await Users.findById(friendId);
        if(!friend) return res.status(404).json({errors:[{msg:'User not found'}]});

        

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }
}

async function addMessage(req,res){
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }
}

export default {getMessages,addMessage};