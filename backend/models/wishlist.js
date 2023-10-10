"use strict";

const db = require("../db");

const {
  BadRequestError, ExpressError,
} = require("../expressError");

const { link } = require("fs");

class Wishlist {
    static async createNewWishlist(username) {
        const result = db.query(
            `INSERT INTO wishlists
            WHERE username = $1`,
        [username]
        )
        if (!result.rows[0]) throw new ExpressError("Could not create a wishlist.")
        return result.rows[0]
    }

    //update to remove username
    static async addItemToWishlist(wishlistId, itemName, linkToItem) {
        const result = db.query(
            `INSERT INTO items
            SET 
                username = $1,
                item_name = $2,
                link_to_item = $3
            WHERE wishlist_id = $4
            RETURNING 
                item_name AS "itemName",
                link_to_item AS "linkToItem",
                gifted
            `,
        [itemName, linkToItem, wishlistId]
        )

        if (!result.rows[0]) throw new BadRequestError("Could not add item to wishlist.")
        return result.rows[0];
    }

    static async removeItemFromWishlist(itemId) {
        const result = db.query(
            `DELETE FROM items
            WHERE item_id = $1
            `,
        [itemId]
        )

        if (!result.rows[0]) throw new BadRequestError("Could not remove item from wishlist.")
    }
    
    static async markAsGifted(itemId) {
        const result = db.query(
            `UPDATE items
            SET gifted = $1
            WHERE item_id = $2
            RETURNING 
                    item_id AS "itemId",
                    item_name AS "itemName",
                    link_to_item AS "linkToItem",
                    gifted
            `,
            [true, itemId]
        )

        if (!result.rows[0]) throw new NotFoundError(`No such item: ${itemName}`)
        return "Item has been marked as gifted!"
    }
}

module.exports = Wishlist;