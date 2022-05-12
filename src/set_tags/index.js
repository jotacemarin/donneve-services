"use strict";

const {
  stringToJSON,
  createResponse,
  createErrorResponse,
} = require("../utils/parser");
const { gdl, setTags: fmSetTags } = require("../utils/filemanager");

const setTags = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { body: bodyString } = event;
    const { remoteId, tags } = stringToJSON(bodyString);

    await fmSetTags(gdl(remoteId), tags);

    return callback(null, createResponse({ success: true }));
  } catch (error) {
    const { message } = error;
    console.error("setTags: ", message);
    console.error("setTags: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  setTags,
};
