"use strict";

const { BOTNORREA_API, BOTNORREA_AUTH_KEY } = process.env;

const axios = require("axios").default;

const botnorrea = axios.create({
  baseURL: BOTNORREA_API,
  timeout: 5000,
  headers: {
    Authorization: BOTNORREA_AUTH_KEY
  }
});

const publicWebhook = async (body) => {
  return await botnorrea.post("/publicWebhook", body);
};

module.exports = {
  publicWebhook,
};
