"use strict";

const { ACTIVE_UPLOAD, FILESMANAGER_API_KEY } = process.env;

const { UNAUTHORIZED } = require("http-status");
const { parse } = require("aws-multipart-parser");
const { createResponse, createErrorResponse } = require("../utils/parser");
const { getKey, delKey } = require("../utils/redis");
const { uploadFile, gdl } = require("../utils/filemanager");

const uploadMedia = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { queryStringParameters: queryString } = event;
    const { code } = queryString;

    const fromRedis = await getKey(`${code}`);
    if (!fromRedis) {
      return callback(null, createErrorResponse("Invalid code", UNAUTHORIZED));
    }

    if (ACTIVE_UPLOAD === "active") {
      const formData = parse(event, true);

      const remoteId = await uploadFile(formData);
      const url = gdl(remoteId);

      return callback(null, createResponse({ url }));
    }

    await delKey(`${code}`);
    const apiKey = FILESMANAGER_API_KEY.split("-");
    return callback(null, createResponse({ apiKey }));
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
