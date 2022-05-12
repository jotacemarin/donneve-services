"use strict";

const { BOTNORREA_API } = process.env;

const axios = require("axios").default;

const botnorrea = axios.create({
  baseURL: BOTNORREA_API,
  timeout: 5000
});

const publicWebhook = async (body) => {
  return await botnorrea.post("/publicWebhook", body);
};

module.exports = {
  publicWebhook,
};
