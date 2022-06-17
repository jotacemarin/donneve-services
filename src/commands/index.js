"use strict";

const { BOT_NAME } = process.env;

const { createResponse, createErrorResponse } = require("../utils/parser");
const { getKeys } = require("../utils/redis");
const { getChatMember } = require("../utils/telegram");

const BOT_REDIS_PREFIX = `${BOT_NAME}`;

const commands = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { headers } = event;
    const userId = headers["user-id"];
    if (!userId) {
      const error = new Error("Unauthorized!");
      error.code = 401;
      throw error;
    }

    const { is_admin: isAdmin } = await getChatMember(userId);
    if (!isAdmin) {
      const error = new Error("Forbidden!");
      error.code = 403;
      throw error;
    }

    const keys = await getKeys(`${BOT_REDIS_PREFIX}:*`);

    const commandsNormalized = keys.map((key = "") =>
      key.replace(`${BOT_REDIS_PREFIX}:`, "")
    );

    return callback(null, createResponse(commandsNormalized));
  } catch (error) {
    const { message, code = 500 } = error;
    return callback(null, createErrorResponse(message, code));
  }
};

module.exports = {
  commands,
};
