"use strict";

const { createResponse, createErrorResponse } = require("../utils/parser");
const { getExchanges } = require("../utils/googlefinance");
const { publicWebhook } = require("../utils/botnorrea");

const dailyExchange = async (_event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { rates, provider } = await getExchanges();
    const ratesFormated = Object.entries(rates)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const message = `Botnorrea daily exchange rates:\n\n${ratesFormated}\n\nProvider: ${provider}.`;
    const { status } = await publicWebhook({ message });
    return callback(null, createResponse({ message, botnorrea: { status } }));
  } catch (error) {
    const { message } = error;
    console.error("dailyExchange: ", message);
    console.error("dailyExchange: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  dailyExchange,
};
