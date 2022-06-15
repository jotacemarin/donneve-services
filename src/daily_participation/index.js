"use strict";

const { connect, userModel } = require("../persistence");
const { publicWebhook } = require("../utils/botnorrea");
const { createResponse, createErrorResponse } = require("../utils/parser");

const calculateStars = (total, score) => {
  const percent = (score * 100) / total + 5;
  const frogs = Math.floor(percent / 10);
  return { percent, frogs };
};

const sanitizeObject = (element) => {
  const { username, score } = element;
  return { username, score };
};

const calculatePercent = (total, totalTop) => (element) => {
  const { score } = element;
  const { percent } = calculateStars(total, score);
  const { frogs } = calculateStars(totalTop, score);
  return { ...element, percent, frogs };
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

    const $match = {};
    const [{ total: participation }] = await userModel
      .aggregate([
        { $match },
        {
          $group: {
            _id: "participation",
            total: {
              $sum: "$score",
            },
          },
        },
      ])
      .exec();
    const topFive = await userModel
      .find($match, { _id: 0, username: 1, score: 1 })
      .sort({ score: -1 })
      .limit(5)
      .exec();
    const topFiveSanitized = topFive.map(sanitizeObject);
    const onlyTopFive = topFiveSanitized
      .map(({ score }) => score)
      .reduce((previous, current) => previous + current, 0);
    const topFiveParticipation = topFiveSanitized
      .map(calculatePercent(participation, onlyTopFive))
      .map(stringBuilder);

    const message = `Botnorrea top 5 sapometro:\n\n${topFiveParticipation.join("\n")}`;
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
  dailyParticipation,
};
