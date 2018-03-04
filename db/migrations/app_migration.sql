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
  item_id BIGINT UNIQUE NOT NULL,
  title VARCHAR(1024),
  image_url VARCHAR(1024),
  price BIGINT,
  condition VARCHAR(255),
  returns_accepted VARCHAR(255),
  ebay_url VARCHAR(1024),
  category VARCHAR(1024),
);

CREATE TABLE favorites (
  id BIGSERIAL PRIMARY KEY,
  ebay_items_ref_item_id BIGINT REFERENCES ebay_items(item_id),
  user_ref_id INTEGER REFERENCES users(id)
);


