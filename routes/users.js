const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
  console.log('getting user', req.user);
  res.json({ userInfo: req.user });
});

module.exports = usersRoutes;
