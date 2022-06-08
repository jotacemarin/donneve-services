"use strict";

const { createCode } = require("./create_code");
const { uploadMedia } = require("./upload_media");
const { setTags } = require("./set_tags");
const { dailyImage } = require("./daily_image");
const { dailyParticipation } = require("./daily_participation");

module.exports = {
  createCode,
  uploadMedia,
  setTags,
  dailyImage,
  dailyParticipation,
};
