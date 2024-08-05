
import { Request, Response } from 'express';
import { Posts, Users, Categories, Comments, PostsCategories} from '../models';

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Posts.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};


// Get all posts 
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Posts.findAll({
            include: [
                { model: Users, as: 'user' },
                { model: Categories, as: 'categories' },
                { model: Comments, as: 'comments' }
            ]
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};



// Get post by ID 
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Posts.findByPk(req.params.postId, {
            include: [
                { model: Users, as: 'user' },
                { model: Categories, as: 'categories' },
                { model: Comments, as: 'comments' }
            ]
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};

export const updatePostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const [updated] = await Posts.update(req.body, {
            where: { id: req.params.postId }
        });
        if (updated) {
            const updatedPost = await Posts.findByPk(req.params.postId);
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};

export const deletePostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await Posts.destroy({
            where: { id: req.params.postId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Post not found'});
    }
};


export const createCommentForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Posts.findByPk(req.params.postId);
        if (post) {
            const comment = await Comments.create({ ...req.body, postId: post.id });
            res.status(201).json(comment);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};




// Get categories for post post
export const getCategoriesForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Posts.findByPk(req.params.postId, {
            include: [{ model: Categories, as: 'categories' }]
        });
        if (post) {
            res.status(200).json(post.get('categories'));
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};

// Get comments for a specific post
export const getCommentsForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Posts.findByPk(req.params.postId, {
            include: [{ model: Comments, as: 'comments' }]
        });
        if (post) {
            res.status(200).json(post.get('comments'));
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status (500).json({ error: 'Post not found'});
    }
};
export const createCategoryForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Posts.findByPk(req.params.postId);
        if (post) {
            const category = await Categories.create(req.body);
            await PostsCategories.create({ postId: post.id, categoryId: category.id });
            res.status(201).json(category);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
};
