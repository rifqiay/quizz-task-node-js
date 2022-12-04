const commonHelper = require("../helper/common");
const bcrypt = require("bcryptjs");
const { v4: uuidV4 } = require("uuid");
const { create, findUsername } = require("../model/admin.model");
const { generateToken, generateRefershToken } = require("../helper/jwt");
const jwt = require("jsonwebtoken");

const adminController = {
  register: (req, res) => {
    const { username, password } = req.body;
    const passwordHash = bcrypt.hashSync(password);
    const data = {
      id: uuidV4(),
      username,
      passwordHash,
    };
    create(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Register Admin Success");
      })
      .catch((error) => res.send(error));
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const {
        rows: [admin],
      } = await findUsername(username);
      if (!admin)
        throw commonHelper.response(res, null, 403, "Username is invalid");
      const isPassword = bcrypt.compareSync(password, admin.password);
      if (!isPassword)
        throw commonHelper.response(res, null, 403, "Password is invalid");
      delete admin.password;
      const payload = {
        id: admin.id,
      };
      admin.token = generateToken(payload);
      admin.refreshToken = generateRefershToken(payload);
      commonHelper.response(res, admin, 200, "Login success");
    } catch (error) {
      console.log(error);
    }
  },
  refreshTokenController: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);

    const payload = {
      id: decoded.id,
    };
    const result = {
      token: generateToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = adminController;
