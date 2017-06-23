var resolveBasket = function () {

  this.getResult = function (request, response, callback) {
    //Split all the cookies
    var theCookies = request.params.cookie.split(';');
    var aString = '';
    var partialCost = 0;
    for (var i = 1; i <= theCookies.length; i++) {
      aString = theCookies[i - 1];
      var finalSplit = aString.split('=');

      //Extracting the details
      var price = (JSON.parse(finalSplit[1]).price);
      var quantity = (JSON.parse(finalSplit[1]).quantity);

      // Is on sale and the item is Papaya do 3 for 2, otherwise keep calculating as non-saled item
      if (((JSON.parse(finalSplit[1]).sale).length !== 0) && (finalSplit[0] === "Papaya")) {
        partialCost += (quantity - Math.floor(quantity / 3) * 3) * price + Math.floor(quantity / 3) * price * 2;
      } else {
        partialCost += (price * quantity);
      }
    }
    //Callback to the router app.js
    callback(("&#8364;" + partialCost.toFixed(2)));
  };

  //Onclick of the 'Buy!' button, summarize all the items for the bill
  this.sendBasketOrder = function (request, response, callback) {
    //Split all the cookies
    var theCookies = request.params.cookie.split(';');
    var aString = '';
    var openingsArray = [];
    var finalObj = {};
    for (var i = 1; i <= theCookies.length; i++) {
      aString = theCookies[i - 1];
      var finalSplit = aString.split('=');
      //Re-building of the final object
      finalObj = { "price": JSON.parse(finalSplit[1]).price, "quantity": JSON.parse(finalSplit[1]).quantity, "sale": JSON.parse(finalSplit[1]).sale }
      openingsArray.push({ key: finalSplit[0], value: finalObj });
    }
    callback(openingsArray);
  };
}

module.exports = new resolveBasket();