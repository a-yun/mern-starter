import Offer from '../models/offer';
import User from '../models/user';
import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all offers for a user
 * @param req
 * @param res
 * @returns void
 */
export function getOffers(req, res) {
  User.findOne({ cuid: req.params.cuid }).find()./* sort('-dateAdded'). */exec((err, offers) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ offers });
  });
}

/**
 * Add a new offer
 * @param req
 * @param res
 * @returns void
 */
export function addOffer(req, res) {
  // if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
  //   res.status(403).end();
  // }

  const newOffer = new Offer(req.body.offer);

  // Let's sanitize inputs
  newOffer.companyName = sanitizeHtml(newOffer.companyName);
  newOffer.cuid = cuid();
  newOffer.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ offer: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
/* export function getOffer(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
} */

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
