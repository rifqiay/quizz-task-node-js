const db = require("../config/db");

const create = (data) => {
  const { id, username, accountNummber, emailAddress, identityNumber } = data;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users(id,username,accountnumber,emailaddress,identitynumber) VALUES(${id},'${username}',${accountNummber},'${emailAddress}',${identityNumber})`,
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

const getByAccountNumber = (accountNummber) => {
  return db.query(`SELECT * FROM users WHERE accountnumber=${accountNummber}`);
};

const getByIdentityNumber = (indentitynumber) => {
  return db.query(
    `SELECT * FROM users WHERE identitynumber=${indentitynumber}`
  );
};

const update = (data) => {
  const { id, username, accountNummber, emailAddress, identityNumber } = data;
  return db.query(
    `UPDATE users set username='${username}', accountnumber=${accountNummber}, emailaddress='${emailAddress}', identitynumber=${identityNumber} WHERE id=${id}`
  );
};

const deleteData = (id) => {
  return db.query(`DELETE FROM users WHERE id=${id}`);
};

const getAll = () => {
  return db.query(`SELECT * FROM users`);
};
module.exports = {
  create,
  getByAccountNumber,
  getByIdentityNumber,
  update,
  deleteData,
  getAll,
};
