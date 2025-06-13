import jwt from  'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//  getting the x-auth-token from the frontend and authenticating the user
export default function(req,res,next) {
    try {
        const token = req.header('x-auth-token');

        if(!token)
            return res.status().json({errors:[{msg:'No Token, Unauthorized'}]});

        const decoded = jwt.verify(token,process.env.jwtSecret);
        req.user = decoded.user;

        next();
    } catch (err) {
        console.error(err.message);
        res.json({errors:[{msg:'Invalid Token!!!'}]});
    }
}