"use strict";

const { createCode } = require("./create_code");
const { uploadMedia } = require("./upload_media");
const { setTags } = require("./set_tags");
const { dailyImage } = require("./daily_image");
const { dailyParticipation } = require("./daily_participation");
const { dailyExchange } = require("./daily_exchange");
const { telegramAuth } = require("./telegram_auth");
const { commands } = require("./commands");
const { getCommand } = require("./get_command");
const { editCommand } = require("./edit_command");

module.exports = {
  createCode,
  uploadMedia,
  setTags,
  dailyImage,
  dailyParticipation,
  dailyExchange,
  telegramAuth,
  commands,
  getCommand,
  editCommand,
};
