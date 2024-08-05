"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryForPost = exports.getCommentsForPost = exports.getCategoriesForPost = exports.createCommentForPost = exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const models_1 = require("../models");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.create(req.body);
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.createPost = createPost;
// Get all posts 
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield models_1.Posts.findAll({
            include: [
                { model: models_1.Users, as: 'user' },
                { model: models_1.Categories, as: 'categories' },
                { model: models_1.Comments, as: 'comments' }
            ]
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.getAllPosts = getAllPosts;
// Get post by ID 
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.findByPk(req.params.postId, {
            include: [
                { model: models_1.Users, as: 'user' },
                { model: models_1.Categories, as: 'categories' },
                { model: models_1.Comments, as: 'comments' }
            ]
        });
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.getPostById = getPostById;
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield models_1.Posts.update(req.body, {
            where: { id: req.params.postId }
        });
        if (updated) {
            const updatedPost = yield models_1.Posts.findByPk(req.params.postId);
            res.status(200).json(updatedPost);
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.updatePostById = updatePostById;
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield models_1.Posts.destroy({
            where: { id: req.params.postId }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.deletePostById = deletePostById;
const createCommentForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.findByPk(req.params.postId);
        if (post) {
            const comment = yield models_1.Comments.create(Object.assign(Object.assign({}, req.body), { postId: post.id }));
            res.status(201).json(comment);
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.createCommentForPost = createCommentForPost;
// Get categories for post post
const getCategoriesForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.findByPk(req.params.postId, {
            include: [{ model: models_1.Categories, as: 'categories' }]
        });
        if (post) {
            res.status(200).json(post.get('categories'));
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.getCategoriesForPost = getCategoriesForPost;
// Get comments for a specific post
const getCommentsForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.findByPk(req.params.postId, {
            include: [{ model: models_1.Comments, as: 'comments' }]
        });
        if (post) {
            res.status(200).json(post.get('comments'));
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.getCommentsForPost = getCommentsForPost;
const createCategoryForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.findByPk(req.params.postId);
        if (post) {
            const category = yield models_1.Categories.create(req.body);
            yield models_1.PostsCategories.create({ postId: post.id, categoryId: category.id });
            res.status(201).json(category);
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Post not found' });
    }
});
exports.createCategoryForPost = createCategoryForPost;
