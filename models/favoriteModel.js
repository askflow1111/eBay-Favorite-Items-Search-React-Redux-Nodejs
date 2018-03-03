const db = require("../db/config");

const favoriteModel = {};

favoriteModel.findAll = () => {
  return db.query(`SELECT * FROM userdata ORDER BY id ASC`);
};

favoriteModel.findFavByUserId = item => {
  return db.query(`SELECT *, ebay_items.itemId AS id
  FROM (ebay_items
  INNER JOIN favorites ON ebay_items.itemId = favorites.ebay_items_ref_itemId)
  WHERE
  favorites.user_ref_id = $1
  `, [1]);
};



favoriteModel.create = item => {

  // INSERT INTO favorites (ebay_items_ref_itemId, user_ref_id)
  // VALUES ($1, $10) RETURNING *
  return db.one(
    ` 
      INSERT INTO ebay_items (itemId, title)
      SELECT * FROM (SELECT $1, $2) AS tmp 
      WHERE NOT EXISTS (
          SELECT itemId FROM ebay_items WHERE itemId = $1
      );
   
      INSERT INTO favorites (ebay_items_ref_itemId, user_ref_id)
      SELECT * FROM (SELECT $1, $10) AS tmp 
      WHERE NOT EXISTS (
          SELECT * FROM favorites WHERE ebay_items_ref_itemId = $1 AND user_ref_id = $4
      );
      
      SELECT * FROM ebay_items WHERE itemId = $1;
    `,
    [
      item.itemId,
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
      WHERE ebay_items_ref_itemId = $1 AND user_ref_id = $2;
      DELETE FROM ebay_items
        WHERE itemId NOT IN (SELECT favorites.ebay_items_ref_itemId 
                        FROM favorites);
    `,
    [data.itemId, data.userId]
  );
};

module.exports = favoriteModel;
