const express = require('express');
const ebayHelpers = require('../services/ebay/ebayHelpers');

const ebay = express.Router();

ebay.post('/', ebayHelpers.fetchItemsFromEbay, (req, res) => {
    res.json(res.locals.ebayApiData);
});

module.exports = ebay;