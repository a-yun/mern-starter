import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as OfferController from '../controllers/offer.controller';
const router = new Router();

// Get all offers for a user
router.route('/user/:user').get(OfferController.getOffers);

// Get details for one offer by cuid
router.route('/offer/:cuid').get(OfferController.getOffer);

// Add an offer to a user
router.route('/new_offer/:user').post(OfferController.addOffer);

// Update a user's offer by cuid
router.route('/update/:user/:cuid').post(OfferController.updateOffer);

// Delete an offer by cuid
router.route('/delete_offer/:user/:cuid').delete(OfferController.deleteOffer);

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
