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

        return result.rows;
    }
}

module.exports = User;