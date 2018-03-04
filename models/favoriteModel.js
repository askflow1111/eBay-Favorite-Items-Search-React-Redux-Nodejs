const db = require("../db/config");

const favoriteModel = {};

favoriteModel.findAll = () => {
  return db.query(`SELECT * FROM userdata ORDER BY id ASC`);
};

favoriteModel.findFavByUserId = item => {
  return db.query(`SELECT *, ebay_items.item_id AS id
  FROM (ebay_items
  INNER JOIN favorites ON ebay_items.item_id = favorites.ebay_items_ref_item_id)
  WHERE
  favorites.user_ref_id = $1
  `, [1]);
};



favoriteModel.create = item => {
  // INSERT INTO favorites (ebay_items_ref_item_id, user_ref_id)
  // VALUES ($1, $10) RETURNING *
  return db.one(
    ` 
      INSERT INTO ebay_items (item_id, title)
      SELECT * FROM (SELECT $1, $2) AS tmp 
      WHERE NOT EXISTS (
          SELECT item_id FROM ebay_items WHERE item_id = $1
      );
   
      INSERT INTO favorites (ebay_items_ref_item_id, user_ref_id)
      SELECT * FROM (SELECT $1, $4) AS tmp 
      WHERE NOT EXISTS (
          SELECT * FROM favorites WHERE ebay_items_ref_item_id = $1 AND user_ref_id = $4
      );
      
      SELECT * FROM ebay_items WHERE item_id = $1;
    `,
    [
      item.item_id,
      item.title,
      item.image_url,
      item.user_id,
    ]
  );
};

favoriteModel.destroy = data => {
  return db.none(
    `
      DELETE FROM favorites
      WHERE ebay_items_ref_item_id = $1 AND user_ref_id = $2;
      DELETE FROM ebay_items
        WHERE item_id NOT IN (SELECT favorites.ebay_items_ref_item_id 
                        FROM favorites);
    `,
    [data.item_id, data.userId]
  );
};

module.exports = favoriteModel;
