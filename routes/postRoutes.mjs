import express from 'express';
import postController from '../controllers/postController.mjs';
import auth from '../middleware/auth.mjs';
import { check } from 'express-validator';
import imageStore from '../middleware/multerImagUploadMiddleware.mjs';

const router = express.Router();

router.route('/').get((req,res)=>{res.send(`Hello from Posts Router`)})
                 .post(auth,imageStore,[check('post_text','Post cannot be empty').not().isEmpty()],postController.addPost);

router.route('/postId').get(postController.getPost)
                       .delete(auth,postController.deletePost)
                       .put(auth,postController.updatePost);

router.get('/getposts',auth,postController.getFriendsPosts);

router.put('/:post_id',auth,postController.addLikes);

router.put('/addcomment/:post_id',auth,[check('comment','Comment cannot be empty').not().isEmpty()],postController.addComment);

export default router;