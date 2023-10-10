"use strict";

const db = require("../db");

const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  BadRequestError,
} = require("../expressError");

const { link } = require("fs");

class Wishlist {
    static async addItemToWishlist(wishlistId, username, itemName, linkToItem) {
        const result = db.query(
            `INSERT INTO wishlists
            SET 
                username = $1,
                item_name = $2,
                link_to_item = $3
            WHERE wishlist_id = $4
            `,
        [username, itemName, linkToItem, wishlistId]
        )

        if (!result.rows[0]) throw new BadRequestError("Missing Information.")
        return result.rows[0];
    }

    static async removeItemFromWishlist(wishlistId, itemName) {
        const result = db.query(
            `DELETE FROM wishlists
            WHERE wishlist_id = $1
            AND item_name = $2
            `,
        [wishlistId, itemName]
        )

        if (!result.rows[0]) throw new BadRequestError("Missing Information.")
        return "Item deleted."
    }
    
    static async markAsGifted(wishlistId) {
        const result = db.query(
            `UPDATE wishlists
            SET gifted = $1
            WHERE wishlist_id = $2`,
            [true, wishlistId]
        )

        if (!result.rows[0]) throw new BadRequestError("Try again.")
        return "Item has been marked as gifted!"
    }
}

module.exports = Wishlist;