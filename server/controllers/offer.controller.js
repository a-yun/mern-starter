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
  console.log(req.params.user);
  User.findOne({ username: req.params.user }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    var offers = [ ];

    if (user == null || user.cuids == null) {
      res.json();
      return;
    }
    for (var i = 0; i < user.cuids.length; i++) {
      console.log(user.cuids[i]);
      Offer.findOne({ cuid: user.cuids[i] }).exec((err, offer) => {
        if (err) {
          res.status(500).send(err);
        }
        console.log('offer: ' + offer);
        offers.push(offer);

        if (offers.length === user.cuids.length) {
          console.log('offers: ' + offers);
          var obj = { 'offers': offers };
          res.json(obj);
        }
      });
    }
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
  console.log(newOffer);

  // Let's sanitize inputs
  newOffer.companyName = sanitizeHtml(newOffer.companyName);
  newOffer.cuid = cuid();

  newOffer.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ offer: saved });
  });

  User.findOne({ username : req.params.user }).exec((err, user) => {
    if (err) {
      console.log(": (");
      return res.status(500).send(err);
    }
    console.log("user to be modified: " + user.username);   
    
    var userCuids = user.cuids;
    userCuids.push(newOffer.cuid);
    
    const newUser = new User({ name: user.name, username: user.username, password: user.password, cuids: userCuids});
      
    user.remove();

    User.create([newUser], (error) => {
      if (error) {
        console.log('error updating user');
      }
    });
  });  
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
 export function getOffer(req, res) {
  Offer.findOne({ cuid: req.params.cuid }).exec((err, offer) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ offer });
  });
} 

/**
 * Update an offer
 * @param req
 * @param res
 * @returns void
 */
export function updateOffer(req, res) {
  deleteOffer(req, res);
  addOffer(req, res);
}

/**
 * Delete an offer
 * @param req
 * @param res
 * @returns void
 */
export function deleteOffer(req, res) {
  Offer.findOne({ cuid: req.params.cuid }).exec((err, offer) => {
    if (err) {
      res.status(500).send(err);
    }

    offer.remove(() => {
      res.status(200).end();
    });
  });

  User.findOne({ username : req.params.user }).exec((err, user) => {
    console.log("user to be modified: " + user.username);   
    if (err) {
      return res.status(500).send(err);
    }

    var userCuids = user.cuids;
    var cuidRemoveIndex = userCuids.indexOf(req.params.cuid);
    if (userCuids.length != 1) {
      userCuids.splice(cuidRemoveIndex, 1);
    } else {
      userCuids.pop();
    }
    
    const newUser = new User({ name: user.name, username: user.username, password: user.password, cuids: userCuids});
      
    user.remove();

    User.create([newUser], (error) => {
      if (error) {
        console.log('error updating user');
      }
    });
  });  
}
