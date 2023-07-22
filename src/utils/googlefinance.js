"use strict";

const { GOOGLE_FINANCE, GOOGLE_FINANCE_USERNAME, GOOGLE_FINANCE_PASSWORD } =
  process.env;

const axios = require("axios").default;

const openexchangerates = axios.create({
  baseURL: GOOGLE_FINANCE,
  timeout: 5000,
  auth: {
    username: GOOGLE_FINANCE_USERNAME,
    password: GOOGLE_FINANCE_PASSWORD,
  },
});

const getExchanges = async () => {
  const { data } = await openexchangerates.get("/exchange");
  const rates = {};
  Object.keys(data).forEach(
    (key) => (rates[String(key).toUpperCase()] = Number(data[key]).toFixed(2))
  );
  return {
    rates,
    provider: String(GOOGLE_FINANCE).replace("/api", ""),
  };
};

module.exports = {
  getExchanges,
};
