const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
  res.json({ userInfo: req.user });
});

module.exports = usersRoutes;
