const { resolve } = require('path');
const db = require('../config/config');

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Products = {};
// CREATE ARTICLE
Products.create = (id, name , price) => {
  db.run("INSERT into products (id, name, price) VALUES ( ?, ?, ? )", [id, name, price], function(err){
    if (err){
      console.log(err)
      return undefined;
    }
  });
  return 1;
};

Products.get = () => {
  return new Promise((resolve, reject) => {
    var products = [];
    db.each("SELECT * FROM products", function(err, row) {
      if (err){
        console.log(err)
        reject(err);
      }
      products.push({
        id : row.id,
        name: row.name,
        price: row.price
      });
    }, () => resolve(products))})
};

Products.getUnique = (id) => {
  
  let found = undefined; 
  db.each("SELECT * FROM products WHERE id = ?", id, function(err, row) {
    if (err){
      console.log(err)
    }
    found = {
      id : row.prod_id,
      name: row.name,
      price: row.price
    }
  });
  return found;
};

// UPDATE AN ARTICLE
Products.update = (id, name, price) => {
  let params = [String(name), String(price), String(id)]
  let query = "UPDATE products SET name = ?, price = ? WHERE id = ?";
  db.run(query, params, function(err){
    if (err){
      console.log(err)
        return undefined;
    }
  })
  return 1;
};

// DELETE AN ARTICLE
Products.delete = (id) => {
  let query = "DELETE FROM products WHERE id = ?";
  db.run(query, id, function(err){
    if (err){
      console.log(err)
      return undefined;
    }
  });
  return 1;
};

module.exports = Products;
