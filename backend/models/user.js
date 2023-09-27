"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");

const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
    // constructor(firstName = null, lastName = null, friends = []) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.friends = friends;
    // }
    /** authenticate user with username, password.
    *
    * Returns { username, full_name }
    *
    * Throws UnauthorizedError if user is not found or invalid password is entered.
    **/
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username,
                    password,
                    full_name AS "fullName",
            FROM users
            WHERE username = $1`,
        [username]
        );

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid) return user
        }
        throw new UnauthorizedError("Invalid login info")
    }
    
    /** authenticate user with username, password.
    *
    * Returns { username, full_name }
    *
    * Throws BadRequestError if username is already in use.
    **/
    static async register({
        username, password, fullName
    }) {
        const isUnique = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
            [username]
        );

        if (isUnique.rows[0]) throw new BadRequestError(`Username already taken.`)

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

        const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              full_name)
            VALUES ($1, $2, $3)
            RETURNING username, full_Name AS "fullName`,
            [username, hashedPassword, fullName]
        );

        const user = result.rows[0];

        return user;
    }

    /** Search for friends by name.
     * 
     * Returns [{ username, full_name }, ...]
     */

    static async searchForUser(friendName) {
        const result = await db.query(
            `SELECT username, 
                    full_name AS "fullName"
            FROM users 
            WHERE full_name ILIKE $1`,
            [friendName]
        )
        if (result.rows.length === 0) throw new NotFoundError("User not found.")
        return result.rows;
    }

    /** Given a username, return data about a user.
     * 
     * Returns { username, full_name, wishlists }
     *  where wishlists is { id, item_name, link_to_item }
     */

    static async getByUsername(username) {
        const result = await db.query(
            `SELECT username, 
                    full_name AS "fullName"
            FROM users
            WHERE username = $1`,
            [username]
        )
        const user = result.rows[0];

        if (!user) throw new NotFoundError("Username not found.")

        const userWishlist = await db.query(
            `SELECT w.wishlist_id
            FROM wishlists AS w
            WHERE w.username = $1`,
            [username]
        )

        const friendRes1 = await db.query(
            `SELECT request_from_username
            WHERE request_to_username = $1
            AND approved = $2`,
        [username, true]
        )

        const friendRes2 = await db.query(
            `SELECT request_to_username
            WHERE request_from_username = $1
            AND approved = $2`,
        [username, true]
        )
        
        // user.firstName = user.fullName.split(" ")
        user.wishlists = userWishlist.rows.map(w => w.wishlist_id);
        user.friends = [...friendRes1, ...friendRes2]

        return user;
    }

    static async checkForFriendship(currentUser, otherUser) {
        const result1 = await db.query(
            `SELECT request_to_username
            WHERE request_from_username = $1
            AND approved = $2`,
        [currentUser, true]
        )

        const result2 = await db.query(
            `SELECT request_from_username
            WHERE request_to_username = $1
            AND approved = $2`,
        [currentUser, true]
        )

        if (!result1.rows[0] && !result2.rows[0]) throw new UnauthorizedError('Friendship not approved.')
    }

    static async sendFriendRequest(currentUser, otherUser) {
        const result = await db.query(
            `INSERT request_to_username,
                    request_from_username,
                    approved
            INTO friendships
            WHERE 
                request_to_username = $1, 
                request_from_username = $2,
                approved = $3
                `,
            [otherUser, currentUser, false]
        )

        return "Request Sent."
    }

    static async removeFriend(currentUser, otherUser) {
        const result1 = await db.query(
            `DELETE FROM friendships
            WHERE 
                request_to_username = $1,
                request_from_username = $2`,
        [currentUser, otherUser]
        )

        if (!result1.rows[0]) {
            const result2 = await db.query(
                `DELETE FROM friendships
                WHERE 
                    request_from_username = $1,
                    request_to_username = $2`,
            [currentUser, otherUser]
            )
        }

        return "Friend removed."
    }

    static async approveFriendship(currentUser, otherUser) {
        const result = await db.query(
            `UPDATE friendships 
            SET approved = $1
            WHERE 
                request_to_username = $2,
                request_from_username = $3`,
            [true, currentUser, otherUser]
        )
        
        return result.rows[0]
    }
}

module.exports = User;