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
      itemId: Number(req.body.itemId),
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      first_brewed_date: req.body.first_brewed_date,
      food_pairing_joined: req.body.food_pairing_joined,
      volume_unit: req.body.volume_unit,
      volume_value: req.body.volume_value,
      abv: req.body.abv,
      user_id: Number(req.body.user_id),
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
      itemId: Number(req.body.itemId),
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