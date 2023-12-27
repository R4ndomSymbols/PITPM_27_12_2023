const bcrypt = require("bcrypt")
const Users = require('../models/users.js');
const jwt = require("jsonwebtoken")
const serverKey = "147014234"

const UserControllers = {}

UserControllers.register = function (req, res) {

   const salt = bcrypt.genSaltSync(9);
   const hashedPassword = bcrypt.hashSync(req.body.password, salt)
   let user = {
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname,
    patronimyc: req.body.patronimyc,
    passwordHash: hashedPassword,
    role: req.body.role,
   }
   let result = Users.register(user);
   if (result != undefined){
        let payload = {
            id: user.id,
            role: user.role
        }
        const jwtToken = jwt.sign(payload, serverKey)
        res.status(200).send({jwtToken})
   }
}
UserControllers.login = function (req, res) {
    let user = undefined;
    Users.getById(req.body.id).then(
        (usergot) => {
            if (usergot == undefined){
                return res.status(401).send("Invalid Login")
            }
            if (bcrypt.compareSync(req.body.password, usergot.passwordHash)){
                const jwtPayload = {id: usergot.id, role: usergot.role}
                const jwtToken = jwt.sign(jwtPayload, serverKey)
                res.status(200).header("auth-token", jwtToken).send({token: jwtToken})
            }
            else{
                return res.status(401).send("Invalid Login")
            }
    })
 }




module.exports = UserControllers
