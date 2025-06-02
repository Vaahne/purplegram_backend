import express from 'express';
import postController from '../controllers/postController.mjs';
import auth from '../middleware/auth.mjs';

const router = express.Router();

router.route('/',auth).get((req,res)=>{res.send(`Hello from Post Router`)})
                 .post(auth,postController.addPost);

router.route('/postId').get(postController.getPost)
                       .delete(auth,postController.deletePost)
                       .put(auth,postController.updatePost);

router.get('/getposts',auth,postController.getFriendsPosts);

router.put('/:post_id',auth,postController.addLikes);

export default router;