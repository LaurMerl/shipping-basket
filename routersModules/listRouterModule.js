var listRouterModule = function () {

  this.getItem = function (request, response) {
    var param = {
      fruitName: request.params.fruitName
    };

    exampleController.test(request, response, params);
  };

};

module.exports = new listRouterModule();