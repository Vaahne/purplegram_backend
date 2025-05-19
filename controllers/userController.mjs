import Users from "../models/Users.mjs";

async function updateUser(req,res){
    let imageDataBase64;
    
    if(req.file)
        imageDataBase64  = fs.readFileSync(req.file.path).toString("base64"); 
    else
        imageDataBase64 = `defaultPhoto`;
    
    req.body.photo = imageDataBase64;

    let updatedUser = await Users.findOneAndUpdate({userId : req.params.userId}, req.body,{new: true,runValidators: true});
    if(updatedUser)
        return res.status(201).json({message: `Updated User details`});
    return res.status(404).json({message: `Something went wrong with user Detils`});
}
async function addUser(req,res){
    let imageDataBase64;
 
    imageDataBase64  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 
    req.body.photo = imageDataBase64;
    
    let newUser = await Users.create(req.body);
    if(newUser)
        return res.status(201).json({message: `Successfully registered`});
    return res.status(404).json({message: `Something went wrong . Please try later!!`});
}

async function deleteUser(req,res) {
    const userId= req.params.userId;
    const deletedUser = await Users.findOneAndDelete({userId});
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deleteUser)
        return res.status(200).json({message:`User deleted successfully`});
    return res.status(404).json({message:`User can't be deleted now`});
}

async function getAllUsers(req,res){
    const data = await Users.find();
    return res.status(200).json(data);
}

async function getUser(req,res) {
    const userId = req.params.userId;
    const user = await Users.findOne({userId});
    if(user)
        return res.status(200).json(user);
}

async function searchByUsername(req,res){
    const userName = req.params.username;
    const user = await Users.find({$name : {$search : userName}});
}

export default {updateUser,addUser,deleteUser,getUser,getAllUsers};