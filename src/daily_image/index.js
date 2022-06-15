"use strict";

const { createResponse, createErrorResponse } = require("../utils/parser");
const { getRandom } = require("../utils/filemanager");
const { publicWebhook } = require("../utils/botnorrea");

const dailyImage = async (_event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const image = await getRandom();
    const message = `Botnorrea daily image:\n\n${image}`
    const { status } = await publicWebhook({ message });
    return callback(null, createResponse({ message, botnorrea: { status } }));
  } catch (error) {
    const { message } = error;
    console.error("dailyImage: ", message);
    console.error("dailyImage: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  dailyImage,
};
