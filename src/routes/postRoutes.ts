import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById, createCategoryForPost, getCategoriesForPost, createCommentForPost, getCommentsForPost } from '../controllers/postController';

const router = Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.put('/:postId', updatePostById);
router.delete('/:postId', deletePostById);
router.post('/:postId/categories', createCategoryForPost);
router.get('/:postId/categories', getCategoriesForPost);
router.post('/:postId/comments', createCommentForPost);
router.get('/:postId/comments', getCommentsForPost);

export default router;