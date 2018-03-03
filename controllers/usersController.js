const bcrypt = require('bcryptjs');
const User = require('../models/user');

const controller = {};

controller.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  })
    .then(user => {
      req.login(user, err => {
        if (err) return next(err);
        res.json({ message: 'user created successfully', data: { user } });
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = controller;