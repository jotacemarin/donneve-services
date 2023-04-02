"use strict";

const { BOT_NAME } = process.env;

const { createResponse, createErrorResponse } = require("../utils/parser");
const {
  connectStandAlone: connect,
  getKeysStandAlone: getKeys,
  setKeyStandAlone: setKey,
  closeConnStandAlone: close,
} = require("../utils/redis");

const BOT_REDIS_PREFIX = `${BOT_NAME}`;
const BOT_PROVIDER_PREFIX = "providers";
const MIN_CALLS = 0;

const dailyRestoreThrottling = async (_, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const redisClient = await connect();

    const providers = await getKeys(
      redisClient,
      `${BOT_REDIS_PREFIX}:${BOT_PROVIDER_PREFIX}:*`
    );

    const updateProvider = async (provider) => {
      await setKey(redisClient, provider, `${MIN_CALLS}`, 0);
      return { key: provider };
    };

    const payload = await Promise.all(providers.map(updateProvider));

    await close(redisClient);
    return callback(null, createResponse(payload));
  } catch (error) {
    const { message, code = 500 } = error;
    return callback(null, createErrorResponse(message, code));
  }
};

module.exports = {
  dailyRestoreThrottling,
};
