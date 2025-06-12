import express from 'express';
import friendRequestController from '../controllers/friendRequestController.mjs';
import auth from '../middleware/auth.mjs';

const router = express.Router();

router.route('/:receiverId').post(auth,friendRequestController.addFriendReq);

router.route('/').get(auth,friendRequestController.getFriendReq)
                 .delete(friendRequestController.deleteFriendReq);

router.route('/update').put(friendRequestController.updateFeild);
router.put('/:sender_id',auth,friendRequestController.updateFriendReq);                 



export default router;