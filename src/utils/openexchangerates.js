"use strict";

const { OPENEXCHANGERATES_API, OPENEXCHANGERATES_APP_ID } = process.env;

const axios = require("axios").default;

const openexchangerates = axios.create({
  baseURL: OPENEXCHANGERATES_API,
  timeout: 5000,
});

const getExchanges = async () => {
  const params = { app_id: OPENEXCHANGERATES_APP_ID };
  const { data } = await openexchangerates.get("/latest.json", { params });
  const { rates: { COP, EUR, GBP } } = data;
  return {
    rates: { COP, EUR, GBP },
    provider: String(OPENEXCHANGERATES_API).replace("/api", ""),
  };
};

module.exports = {
  getExchanges,
};
