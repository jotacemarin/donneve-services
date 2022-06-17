"use strict";

const { connect, userModel } = require("../persistence");
const { createResponse, createErrorResponse } = require("../utils/parser");
const { getChatMember } = require("../utils/telegram");

const telegramAuth = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { queryStringParameters: queryString } = event;
    const { userId } = queryString;
    const botnorreaUser = await getChatMember(userId);
    const { id_tg: idTg } = botnorreaUser;

    await connect();
    const mongoUser = await userModel.findOne({ id: `${idTg}` }).exec();
    const { _id: idMongo, score, createdAt, updatedAt } = mongoUser;

    const user = {
      ...botnorreaUser,
      id: idMongo,
      score,
      createdAt,
      updatedAt,
    };

    return callback(null, createResponse(user));
  } catch (error) {
    const { message, response = {} } = error;
    const { status = 500 } = response;
    return callback(null, createErrorResponse(message, status));
  }
};

module.exports = {
  telegramAuth,
};
