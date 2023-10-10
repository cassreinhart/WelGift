"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCurrentUser, ensureLoggedIn, ensureCurrentUserOrAreFriends } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const Wishlist = require("../models/wishlist")
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** GET /[username] => { user }
 *
 * Returns { username, fullName}
 *
 * Authorization required: login (current user)
 **/

router.get("/:username", ensureLoggedIn, ensureCurrentUserOrAreFriends, async function (req, res, next) {
  try {
    const user = await User.getByUsername(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { fullName, password }
 *
 * Returns { username, fullName }
 *
 * Authorization required: login
 **/

router.patch("/:username", ensureLoggedIn, ensureCurrentUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: current user deleting self deleting user
 **/

router.delete("/:username", ensureLoggedIn, ensureCurrentUser, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});


/** POST /[username]/wishlists/[id]
 * 
 * Authorization required: logged in
*/

router.post("/:username/wishlists/:id", ensureCurrentUser, async function (req, res, next) {
  try {
    const wishlistId = +req.params.id
    const username = req.params.username
    const itemName = req.body.itemName;
    const linkToItem = req.body.linkToItem;
    await Wishlist.addItemToWishlist(wishlistId, username, itemName, linkToItem)
    return res.json({applied: jobId})
  } catch (err) {
    return next(err)
  }
})

router.patch("/:username/wishlists/:id", ensureCurrentUserOrAreFriends, async function(req, res, next) {
    try {
        const itemId = +req.body.itemId;
        await Wishlist.markAsGifted(itemId)
        return res.json({itemName: gifted})
    } catch (err) {
        return next(err)
    }
})

module.exports = router;