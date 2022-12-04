const commonHelper = require("../helper/common");
const {
  create,
  getByAccountNumber,
  getByIdentityNumber,
  update,
  deleteData,
  getAll,
} = require("../model/crud.model");
const client = require("../config/redis");
const { promisify } = require("util");
const { json } = require("express");

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

const userController = {
  createController: (req, res) => {
    const { id, username, accountNummber, emailAddress, identityNumber } =
      req.body;
    const data = { id, username, accountNummber, emailAddress, identityNumber };
    create(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Create Success");
      })
      .catch((error) => res.send(error));
  },
  getByAccountNumberController: async (req, res) => {
    try {
      const accountnumber = req.params.accountNummber;
      const reply = await GET_ASYNC("getByAccountNumber");
      if (reply) {
        commonHelper.response(
          res,
          JSON.parse(reply),
          200,
          "Get data from redis"
        );
      }
      const response = await getByAccountNumber(accountnumber);
      await SET_ASYNC(
        "getByAccountNumber",
        JSON.stringify(response.rows),
        "EX",
        30
      );
      commonHelper.response(res, response.rows, 200, "Get data from database");
    } catch (error) {
      res.send(error);
    }
  },
  getByIdentityNumberController: async (req, res) => {
    try {
      const identitynumber = req.params.identitynumber;
      const reply = await GET_ASYNC("userByIdentityNumber");
      if (reply) {
        commonHelper.response(
          res,
          JSON.parse(reply),
          200,
          "Get all data from redis success"
        );
        return;
      }
      const response = await getByIdentityNumber(identitynumber);
      await SET_ASYNC(
        "userByIdentityNumber",
        JSON.stringify(response.rows),
        "EX",
        30
      );
      commonHelper.response(
        res,
        response.rows,
        200,
        "Get data from database success"
      );
    } catch (error) {
      res.send(error);
    }
  },
  updateController: (req, res) => {
    const id = req.params.id;
    const { username, accountNummber, emailAddress, identityNumber } = req.body;
    const data = { id, username, accountNummber, emailAddress, identityNumber };
    update(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Update Success");
      })
      .catch((error) => res.send(error));
  },
  deleteController: (req, res) => {
    const id = req.params.id;
    deleteData(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Delete Success");
      })
      .catch((error) => res.send(error));
  },
  getAllController: async (req, res) => {
    try {
      const reply = await GET_ASYNC("users");
      if (reply) {
        commonHelper.response(
          res,
          JSON.parse(reply),
          200,
          "Get all data from redis success"
        );
        return;
      }
      const response = await getAll();
      await SET_ASYNC("users", JSON.stringify(response.rows), "EX", 30);
      commonHelper.response(
        res,
        response.rows,
        200,
        "Get all data from database success"
      );
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = userController;
