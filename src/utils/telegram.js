"use strict";

const { TELEGRAM_TOKEN, MAIN_CHAT } = process.env;

const axios = require("axios").default;

const botnorrea = axios.create({
  baseURL: `https://api.telegram.org/bot${TELEGRAM_TOKEN}`,
  timeout: 5000
});

const getChatMember = async (userId) => {
  const params = { user_id: userId, chat_id: MAIN_CHAT };
  const axiosResponse = await botnorrea.get("/getChatMember", { params });
  const { data: { result } } = axiosResponse;
  return result;
};

module.exports = {
  getChatMember,
};
