// REQUIRE CONTROLLER
const ProductControllers = require('../controllers/productsControllers');
const UserControllers = require('../controllers/usersControllers');
const AuthController = require('../controllers/authController');
const express = require("express");
const router = express.Router();

router.get("/products", ProductControllers.getAllProducts);
router.get("/products/:id'", ProductControllers.getProductById);
router.post("/products",AuthController.verifyUser, AuthController.isAdmin, ProductControllers.addProduct);
router.put("/products/:id", AuthController.verifyUser, AuthController.isAdmin, ProductControllers.changeProduct);
router.delete("/products/:id", AuthController.verifyUser, AuthController.isAdmin, ProductControllers.deleteProduct);
router.post("/users/register", AuthController.verifyUser, AuthController.isAdmin, UserControllers.register);
router.get("/users/login", UserControllers.login);

module.exports = router;