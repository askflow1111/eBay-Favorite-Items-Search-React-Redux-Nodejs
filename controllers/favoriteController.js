const favoriteModel = require("../models/favoriteModel");

const favoriteController = {};

favoriteController.show = (req, res) => {
  favoriteModel.findFavByUserId()
    .then(item => {
      let obj = {};
      item.forEach(e => obj[e.id] = e)
      res.json({
        message: "ok",
        data: {
          data: obj
        }
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

favoriteController.create = (req, res) => {
  favoriteModel.create({
    item_id: Number(req.body.item_id),
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    user_id: Number(req.body.user_id),
    price: Number(req.body.price),
    condition: req.body.condition,
    returns_accepted: req.body.returns_accepted,
    ebay_url: req.body.ebay_url,
    category: req.body.category,
  })
    .then(data => {
      res.json({
        message: "ok",
        data: {
          data
        }
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

favoriteController.destroy = (req, res) => {
  favoriteModel.destroy({
    item_id: Number(req.body.item_id),
    userId: Number(req.body.user_id),
  })
    .then(response => {
      res.json({
        message: "item deleted successfully"
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = favoriteController;