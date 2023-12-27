const Products = require('../models/products.js');

const ContollerCollection = {}

ContollerCollection.getAllProducts = function (req, res) {
  Products.get().then((result) => {
    console.log(result)
    var products = JSON.stringify(result);
    res.send(products);
  });
}

ContollerCollection.getProductById = function (req, res) {
  let id = req.params.id; // получаем id
  let product = Products.getUnique(id)
  if (product == undefined){
      res.status(404).send();
  }
  else {
      res.send(JSON.stringify(product));
  } 
}

ContollerCollection.addProduct = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let productName = req.body.name;
  let productId = req.body.id;
  let productPrice = req.body.price;
  let result = Products.create(productId, productName, productPrice)

  if (result === undefined){
      res.status(400).send()
  }
  else {
      res.send(JSON.stringify(productId))
  }
}

ContollerCollection.deleteProduct = function (req, res) {
  let id = req.params.id;
  let result = Products.delete(id);
  if (result === undefined) {
    res.status(404).send();
  } else {
    res.send(JSON.stringify(id));
  }
}

ContollerCollection.changeProduct =  function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let productId = req.params.id;
  let productName = req.body.name;
  let productPrice = req.body.price;
  let result = Products.update(productId, productName, productPrice)

  // изменяем данные у пользователя
  if (result === undefined) {
      res.sendStatus(400);
  } else {
      res.send(JSON.stringify(productId));
  }
}





module.exports = ContollerCollection
