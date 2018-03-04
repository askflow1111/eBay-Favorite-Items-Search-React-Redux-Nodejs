\connect ebay_fav_items;

DROP TABLE favorites;
DROP TABLE users;
DROP TABLE ebay_items;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  password TEXT UNIQUE NOT NULL
);

CREATE TABLE ebay_items (
  id BIGSERIAL PRIMARY KEY,
  itemId BIGINT UNIQUE NOT NULL,
  title VARCHAR(1024),
  image_url VARCHAR(1024)
);

CREATE TABLE favorites (
  id BIGSERIAL PRIMARY KEY,
  ebay_items_ref_itemId BIGINT REFERENCES ebay_items(itemId),
  user_ref_id INTEGER REFERENCES users(id)
);


