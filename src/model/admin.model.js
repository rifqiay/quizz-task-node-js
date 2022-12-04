const db = require("../config/db");

const create = (data) => {
  const { id, username, passwordHash } = data;
  return db.query(
    `INSERT INTO admin(id, username, password) values('${id}', '${username}', '${passwordHash}')`
  );
};

const findUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM admin where username='${username}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = { create, findUsername };
