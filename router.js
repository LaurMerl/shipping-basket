var express = require('express');
var router = express.Router();

var listRouterModule = require("./routersModules/listRouterModule");
var resolveBasketRouterModule = require("./routersModules/resolveBasketRouterModule");

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/getListItem/:fruitName', listRouterModule.getItem);
router.get('/resolveBasket', resolveBasketRouterModule.totalPrice);

module.exports = router;