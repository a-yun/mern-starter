import { Router } from 'express';
import * as OfferController from '../controllers/post.controller';
const router = new Router();

// Get all offers for a user
router.route('/offers/:user').get(OfferController.getOffers);

// Get details for one offer by cuid
// router.route('/offers/:user/:cuid').get(OfferController.getOffer);

// Add an offer to a user
router.route('/offers/:user').post(OfferController.addOffer);

// Edit a user's offer by cuid
router.route('/offers/:user/:cuid').post(OfferController.editOffer);

// Delete an offer by cuid
router.route('/offers/:user/:cuid').delete(OfferController.deleteOffer);

// TODO: remove old endpoints
// Get all Posts
router.route('/posts').get(OfferController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(OfferController.getPost);

// Add a new Post
router.route('/posts').post(OfferController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(OfferController.deletePost);

export default router;
