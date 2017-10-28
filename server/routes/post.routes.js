import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all offers for a user
router.route('/offers/:user').get(PostController.getOffers);

// Get details for one offer by cuid
router.route('/offers/:user/:cuid').get(PostController.getOffer);

// Add an offer to a user
router.route('/offers/:user').post(PostController.addOffer);

// Edit a user's offer by cuid
router.route('/offers/:user/:cuid').post(PostController.editOffer);

// Delete an offer by cuid
router.route('/offers/:user/:cuid').delete(PostController.deleteOffer);

// TODO: remove old endpoints
// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
