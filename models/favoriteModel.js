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
  return db.one(
    ` 
      INSERT INTO ebay_items (item_id, title, image_url, price, condition, returns_accepted, ebay_url, category)
      SELECT * FROM (SELECT $2, $3, $4, $5, $6, $7, $8, $9) AS tmp 
      WHERE NOT EXISTS (
          SELECT item_id FROM ebay_items WHERE item_id = $2
      );
   
      INSERT INTO favorites (ebay_items_ref_item_id, user_ref_id)
      SELECT * FROM (SELECT $2, $1) AS tmp 
      WHERE NOT EXISTS (
          SELECT * FROM favorites WHERE ebay_items_ref_item_id = $2 AND user_ref_id = $1
      );
      
      SELECT * FROM ebay_items WHERE item_id = $2;
    `,
    [
      item.user_id,
      item.item_id,
      item.title,
      item.image_url,
      item.price,
      item.condition,
      item.returns_accepted,
      item.ebay_url,
      item.category
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
