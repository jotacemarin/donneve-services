"use strict";

const { COLOMBIA_COM = "https://www.colombia.com" } = process.env;

const axios = require("axios").default;
const { JSDOM: jsDom } = require("jsdom");

const botnorrea = axios.create({
  baseURL: COLOMBIA_COM,
  timeout: 5000,
});

const getExchanges = async () => {
  const { data } = await botnorrea.get("/cambio-moneda");
  const {
    window: { document },
  } = new jsDom(data);
  const exchangesDom = document.querySelectorAll("ul.primera > li");

  const exchanges = {};
  let lastKey = "";
  for (let index = 0; index < exchangesDom.length; index++) {
    const textContent = String(exchangesDom.item(index).textContent)
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (index % 2) {
      exchanges[lastKey] = textContent;
    }
    lastKey = textContent;
  }

  return exchanges;
};

module.exports = {
  getExchanges,
};
