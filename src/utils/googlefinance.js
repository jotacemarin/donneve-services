"use strict";

const { GOOGLE_FINANCE } = process.env;

const axios = require("axios").default;

const openexchangerates = axios.create({
  baseURL: GOOGLE_FINANCE,
  timeout: 5000,
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
