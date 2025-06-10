import express from 'express';
import commentController from '../controllers/commentController.mjs';
import auth from '../middleware/auth.mjs';
import { check } from 'express-validator';
const router = express.Router();

// router.route('/').post(auth,commentController.addComment);

router.route('/:commentId').delete(auth,commentController.deleteComment)
                            .put(auth,commentController.updateComment);

router.route('/:postId').get(auth ,commentController.getComment)                        
                        .post(auth,[check('comment','Comment cannot be empty').not().isEmpty()],commentController.addComment);

export default router;