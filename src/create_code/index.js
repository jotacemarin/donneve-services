"use strict";

const {
  stringToJSON,
  createResponse,
  createErrorResponse,
} = require("../utils/parser");
const { setKey } = require("../utils/redis");

const randomNumber = (min = 100000, max = 999999) =>
  parseInt(Math.random() * (max - min) + min);

const createCode = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { body: bodyString } = event;
    console.log(bodyString)
    const { from } = stringToJSON(bodyString);

    const code = randomNumber();
    await setKey(`${code}`, from);

    return callback(null, createResponse({ code }));
  } catch (error) {
    const { message } = error;
    console.error("createCode: ", message);
    console.error("createCode: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  createCode,
};
