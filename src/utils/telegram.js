"use strict";

const { TELEGRAM_TOKEN, MAIN_CHAT } = process.env;

const axios = require("axios").default;

const CHAT_CREATOR = "creator";
const CHAT_ADMIN = "administrator";
const CHAT_MEMBER = "member";

const telegram = axios.create({
  baseURL: `https://api.telegram.org/bot${TELEGRAM_TOKEN}`,
  timeout: 5000,
});

const getChatMember = async (userId) => {
  const params = { user_id: userId, chat_id: MAIN_CHAT };
  const axiosResponse = await telegram.get("/getChatMember", { params });
  const { data } = axiosResponse;
  const { status, user } = data.result ?? {};
  const { id: id_tg } = user;

  return {
    ...user,
    id_tg,
    status,
    is_member: [CHAT_CREATOR, CHAT_ADMIN, CHAT_MEMBER].includes(status),
    is_admin: [CHAT_CREATOR, CHAT_ADMIN].includes(status),
    is_creator: status === CHAT_CREATOR,
  };
};

module.exports = {
  getChatMember,
};
