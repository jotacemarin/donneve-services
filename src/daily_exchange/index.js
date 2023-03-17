"use strict";

const { createResponse, createErrorResponse } = require("../utils/parser");
const { getExchanges } = require("../utils/colombiacom");
const { publicWebhook } = require("../utils/botnorrea");

const dailyExchange = async (_event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const exchanges = await getExchanges();
    const exchangesFormated = Object.entries(exchanges)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const message = `Botnorrea daily exchanges:\n\n${exchangesFormated}`;
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
