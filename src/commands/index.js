"use strict";

const { BOT_NAME } = process.env;

const {
  createResponse,
  createErrorResponse,
} = require("../utils/parser");
const { getKeys } = require("../utils/redis");

const BOT_REDIS_PREFIX = `${BOT_NAME}`;

const commands = async (_event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const keys = await getKeys(`${BOT_REDIS_PREFIX}:*`);

    const commandsNormalized = keys.map((key = "") => key.replace(`${BOT_REDIS_PREFIX}:`, ""));

    return callback(null, createResponse(commandsNormalized));
  } catch (error) {
    const { message } = error;
    console.error("createCode: ", message);
    console.error("createCode: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  commands,
};
