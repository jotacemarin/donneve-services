"use strict";

const { connect, userModel } = require("../persistence");
const { createResponse, createErrorResponse } = require("../utils/parser");
const { getChatMember } = require("../utils/telegram");

const CHAT_CREATOR = "creator";
const CHAT_ADMIN = "administrator";
const CHAT_MEMBER = "member";

const telegramAuth = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { queryStringParameters: queryString } = event;
    const { userId } = queryString;
    const { status, user: botnorreaUser } = await getChatMember(userId);
    const { id: idTg } = botnorreaUser;

    await connect();
    const mongoUser = await userModel.findOne({ id: `${idTg}` }).exec();
    const { _id: idMongo, score, createdAt, updatedAt } = mongoUser;

    const user = {
      ...botnorreaUser,
      id: idMongo,
      id_tg: idTg,
      status,
      is_member: [CHAT_CREATOR, CHAT_ADMIN, CHAT_MEMBER].includes(status),
      is_admin: [CHAT_CREATOR, CHAT_ADMIN].includes(status),
      is_creator: status === CHAT_CREATOR,
      score,
      createdAt,
      updatedAt,
    };

    return callback(null, createResponse(user));
  } catch (error) {
    const { message, response = {} } = error;
    const { status = 500 } = response;
    console.error("telegramAuth: ", message);
    console.error("telegramAuth: ", error);
    return callback(null, createErrorResponse(message, status));
  }
};

module.exports = {
  telegramAuth,
};
