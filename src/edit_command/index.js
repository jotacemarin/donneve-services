"use strict";

const { BOT_NAME } = process.env;

const {
  createResponse,
  createErrorResponse,
  stringToJSON,
} = require("../utils/parser");
const { getKey, setKey } = require("../utils/redis");

const BOT_REDIS_PREFIX = `${BOT_NAME}`;
const COMMAND_ENABLED = "1";
const COMMAND_DISABLED = "0";

const editCommand = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const {
      body: bodyString,
      pathParameters: { command },
    } = event;
    const { value } = stringToJSON(bodyString);
    const key = `${BOT_REDIS_PREFIX}:${command}`;
    const rawValue = await getKey(key);

    if (!rawValue) {
      const error = new Error("Command not found!");
      error.code = 404;
      throw error;
    }

    const newValue = value ? COMMAND_ENABLED : COMMAND_DISABLED;
    await setKey(key, newValue, 0);

    const payload = {
      key,
      currentRawValue: rawValue,
      nextRawValue: newValue,
      nextValue: value,
    };

    return callback(null, createResponse(payload));
  } catch (error) {
    const { message, code = 500 } = error;
    return callback(null, createErrorResponse(message, code));
  }
};

module.exports = {
  editCommand,
};
