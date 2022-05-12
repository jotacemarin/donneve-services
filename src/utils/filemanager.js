"use strict";

const { FILESMANAGER_API, FILESMANAGER_API_KEY } = process.env;

const axios = require("axios").default;

const filesManager = axios.create({
  baseURL: FILESMANAGER_API,
  timeout: 10000,
  headers: {
    api_key: FILESMANAGER_API_KEY,
  },
});

const buildTags = (tags = [], label = "tags") => {
  if (!tags.length) {
    return "";
  }

  const stringTags = tags.join(" | ");
  return `\n\n${label}: [ ${stringTags} ]`;
};

const getRandom = async () => {
  const categories = ["image", "video"]
    .map((category) => `category=${category}`)
    .join("&");
  const {
    data: { webContentUrl, tags },
  } = await filesManager.get(`/Files/random?${categories}`);
  const stringTags = buildTags(tags);
  return `${webContentUrl}${stringTags}`;
};

const searchByTags = async (tags = []) => {
  const { data: files } = await filesManager.post("/Tags/search?limit=1", tags);
  if (files.length) {
    const [{ webContentUrl, tags: fileTags }] = files;
    const stringTags = buildTags(fileTags);
    return `${webContentUrl}${stringTags}`;
  }
  throw new Error("Not media found");
};

const setTags = async (webContentUrl = "", tags = []) => {
  const body = { webContentUrl, tags, remoteId: null };
  const {
    data: { webContentUrl: remoteWebContentUrl, tags: remoteTags, newTags },
  } = await filesManager.post("/Tags", body);
  const stringTags = buildTags(remoteTags);
  const newStringTags = buildTags(newTags, "new tags");
  return `${remoteWebContentUrl}${stringTags}${newStringTags}`;
};

const uploadFile = async (formData) => {
  const headers = { "Content-Type": `multipart/form-data` };
  const {
    data: { remoteId },
  } = await filesManager.post("/Files/upload", formData, { headers });
  return remoteId;
};

const gdl = (remoteId) =>
  `https://drive.google.com/uc?id=${remoteId}&export=download`;

module.exports = {
  getRandom,
  searchByTags,
  setTags,
  uploadFile,
  gdl,
};
