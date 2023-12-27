const bcrypt = require("bcrypt")
const Users = require('../models/users.js');
const jwt = require("jsonwebtoken")
const serverKey = "147014234"
const adminLevel = 1
const userLevel = 2

const AuthController = {}

AuthController.verifyUser = function (req, res, next) {
    let token = req.headers.authorization;
    if (!token){
        return res.status(401).send("Access Denied / Unauthorized request");
    } 
    try {
        //token = token.split(' ')[1] // Remove Bearer from string

        let verifiedUser = jwt.verify(token, serverKey);   // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) {
            return res.status(401).send('Unauthorized request')
        }
        req.user = verifiedUser;
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}
AuthController.isAdmin = function (req, res, next) {
    if (req.user.role === adminLevel){
        next()
    }
    else {
        res.status(403).send("Forbidden")
    }
}
AuthController.isUser = function (req, res, next) {
    if (req.user.role === userLevel){
        next()
    }
    else {
        res.status(403).send("Forbidden")
    }
}


module.exports = AuthController
