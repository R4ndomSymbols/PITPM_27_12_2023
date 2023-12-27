const db = require('../config/config');

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Users = {};
// CREATE ARTICLE
Users.register = (user) => {
  db.run("INSERT into users (id, password_hash,  name, surname, patronimyc, city, role) VALUES ( ?, ?, ?, ?, ?, ?, ?)", 
  [user.id, user.passwordHash, user.name, user.surname, user.patronimyc, user.city, user.role], function(err){
    if (err){
      console.log(err)
      return undefined;
    }
  });
  return 1;
};

Users.getById = (id) => {
  return new Promise((resolve, reject) => {
    var user = undefined
    db.each("SELECT * FROM users WHERE id = ?", id, function(err, row) {
      if (err){
        console.log(err)
        reject(err);
      }
      user = {
        id: id,
        name: row.name,
        surname: row.surname,
        patronimyc: row.patronimyc,
        passwordHash: row.password_hash,
        city: row.city,
        role: row.role,
      }
      resolve(user)});
    })
}

module.exports = Users;
