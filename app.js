var express = require("express");
var app = express();
var path = require("path");

var resolveBasket = require('./public/js/getResult');

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getResult/:cookie', (request, response) => {
  var callback = function (result) {
    response.status(200).send(JSON.stringify(result).replace(/['"]+/g, ''));
  }

  resolveBasket.getResult(request, response, callback);
});

app.get('/getResult/', (request, response) => {
  response.status(200).send(JSON.stringify(0));
});

app.get('/sendBasketOrder/:cookie', (request, response) => {
  var callback = function (result) {
    response.status(200).send(JSON.stringify(result));
  }

  resolveBasket.sendBasketOrder(request, response, callback);
});

app.get('/sendBasketOrder/', (request, response) => {
  var callback = function (result) {
    response.status(200).send("No items selected");
  }
});

app.listen(3000);

//console.log("Running at http://localhost:3000/");