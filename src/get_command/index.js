"use strict";

const { BOT_NAME } = process.env;

const { createResponse, createErrorResponse } = require("../utils/parser");
const { getKey } = require("../utils/redis");

const BOT_REDIS_PREFIX = `${BOT_NAME}`;
const COMMAND_ENABLED = "1";

const getCommand = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const {
      pathParameters: { command },
    } = event;
    const key = `${BOT_REDIS_PREFIX}:${command}`;
    const rawValue = await getKey(key);
    const value = rawValue === COMMAND_ENABLED;

    if (!rawValue) {
      const error = new Error("Command not found!");
      error.code = 404;
      throw error;
    }

    return callback(null, createResponse({ key, rawValue, value }));
  } catch (error) {
    const { message, code = 500 } = error;
    return callback(null, createErrorResponse(message, code));
  }
};

module.exports = {
  getCommand,
};
