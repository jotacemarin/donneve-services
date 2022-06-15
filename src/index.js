"use strict";

const { createCode } = require("./create_code");
const { uploadMedia } = require("./upload_media");
const { setTags } = require("./set_tags");
const { dailyImage } = require("./daily_image");
const { dailyParticipation } = require("./daily_participation");
const { telegramAuth } = require("./telegram_auth");

module.exports = {
  createCode,
  uploadMedia,
  setTags,
  dailyImage,
  dailyParticipation,
  telegramAuth,
};
