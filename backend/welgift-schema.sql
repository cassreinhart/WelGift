CREATE DOMAIN weburl AS text
CHECK (VALUE ~ '^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$');
 
COMMENT ON DOMAIN weburl IS 'match URLs (http or https)';

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  hashed_password TEXT NOT NULL,
  full_name TEXT NOT NULL
);

CREATE TABLE friendships (
  request_to_username VARCHAR(25),
  request_from_username VARCHAR(25),
  approved BOOLEAN,
  PRIMARY KEY (request_to_username, request_from_username)
);

CREATE TABLE wishlists (
  wishlist_id INTEGER,
  username VARCHAR(25)
    REFERENCES users(username),
  item_name TEXT NOT NULL,
  link_to_item weburl NOT NULL
);
