export default function globalError(err,req,res,next){
    res.status(500).json({message: err.message});
}