"use strict";

const { connect, userModel } = require("../persistence");
const { publicWebhook } = require("../utils/botnorrea");
const { getInsights } = require("../utils/mixpanel");
const { createResponse, createErrorResponse } = require("../utils/parser");

const DISABLED = true;

const sanitizeUser = (element) => {
  const { username, id } = element;
  return { username, id };
};

const getUsers = (series) => {
  const [key] = Object.keys(series);
  const users = Object.keys(series[key]);
  return users.map((user) => ({ id: `${user}` }));
};

const populateUser = (rawReport, users) => (key) => {
  const user = users.find((user) => user.id === key);
  const { value } = rawReport[key];
  return { ...user, value };
};

const populateUsers = (rawReport, users = []) => {
  return Object.keys(rawReport).map(populateUser(rawReport, users));
};

const calculateStars = (total, score) => {
  const rawPercent = (score * 100) / total + 5;
  const rawFrogs = Math.floor(rawPercent / 10);
  const percent = Number(rawPercent).toFixed(2);
  const frogs = rawFrogs ? rawFrogs : 1;
  return { percent, frogs };
};

const calculatePercent = (total) => (element) => {
  const { value } = element;
  const { frogs, percent } = calculateStars(total, value);
  return { ...element, frogs, percent };
};

const getSumReports = (series, users) => {
  const [messagesKeys, wordsKeys] = Object.keys(series);

  const reportMessages = series[messagesKeys];
  const reportWords = series[wordsKeys];

  const messages = populateUsers(reportMessages, users);
  const words = populateUsers(reportWords, users);

  const [{ value: overallMessages }] = messages.splice(messages.length - 1, 1);
  const [{ value: overallWords }] = words.splice(words.length - 1, 1);

  const messagesPercent = messages.map(calculatePercent(overallMessages));
  const wordsPercent = words.map(calculatePercent(overallWords));

  return { messages: messagesPercent, words: wordsPercent };
};

const stringBuilder = (element) => {
  const { username, percent: rawPercent, frogs } = element;
  const percent = Number(rawPercent).toFixed(0);
  const frogMetter = Array.from({ length: frogs }, () => `🐸`).join("");
  return `@${username}: ${percent}%\n${frogMetter}`;
};

const dailyParticipation = async (_event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connect();

    const [{ series }] = await getInsights();
    const users = getUsers(series);

    const $match = { $or: users };
    const usernames = await userModel
      .find($match, { _id: 0, username: 1, id: 1 })
      .exec()
      .then((response) => response.map(sanitizeUser));

    const { messages, words } = getSumReports(series, usernames);
    const stringMessages = messages.map(stringBuilder).join("\n");
    const stringWords = words.map(stringBuilder).join("\n");

    const toMessages = `Botnorrea sapometro by messages:\n\n${stringMessages}`;
    const toWords = `Botnorrea sapometro by words:\n\n${stringWords}`;

    const responses = await Promise.all([
      publicWebhook({ message: toMessages }),
      publicWebhook({ message: toWords }),
    ]);
    const [{ status: statusMessages }, { status: statusWords }] = responses;

    const completeMessage = `${toMessages}\n\n${toWords}`;

    return callback(
      null,
      createResponse({
        message: completeMessage,
        botnorrea: { statusMessages, statusWords },
      })
    );
  } catch (error) {
    const { message } = error;
    console.error("dailyImage: ", message);
    console.error("dailyImage: ", error);
    return callback(null, createErrorResponse(message));
  }
};

module.exports = {
  dailyParticipation,
};
