"use strict";

const { UNAUTHORIZED } = require("http-status");
const { parse } = require("aws-multipart-parser");
const { createResponse, createErrorResponse } = require("../utils/parser");
const { getKey } = require("../utils/redis");
const { uploadFile, gdl } = require("../utils/filemanager");

const uploadMedia = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { queryStringParameters: queryString } = event;
    const { code } = queryString;

    const fromRedis = await getKey(`${code}`);
    if (fromRedis !== "valid") {
      return callback(null, createErrorResponse("Invalid code", UNAUTHORIZED));
    }

    const formData = parse(event, true);

    const remoteId = await uploadFile(formData);
    const url = gdl(remoteId);

    return callback(null, createResponse({ url }));
  } catch (error) {
    const { message } = error;
    console.error("uploadMedia: ", message);
    console.error("uploadMedia: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  uploadMedia,
};
