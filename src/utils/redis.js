"use strict";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const { createClient } = require("redis");

const getClient = async () =>
  createClient({
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
    password: REDIS_PASSWORD,
  });

const setKey = async (key, value, ttl = 300) => {
  const client = await getClient();
  await client.connect();
  await client.set(key, value);
  if (ttl !== 0) {
    await client.expire(key, ttl);
  }
  await client.quit();
};

const getKey = async (key) => {
  const client = await getClient();
  await client.connect();
  const value = await client.get(key);
  await client.quit();
  return value;
};

const delKey = async (key) => {
  const client = await getClient();
  await client.connect();
  await client.del(key);
  await client.quit();
};

const getKeys = async (pattern = "*") => {
  const client = await getClient();
  await client.connect();
  const keys = await client.keys(pattern);
  await client.quit();
  return keys;
};

const connectStandAlone = async () => {
  const client = await getClient();
  await client.connect();
  return client;
};

const getKeysStandAlone = async (client, pattern = "*") => {
  if (!client) {
    throw new Error("Redis connection refused!");
  }

  const keys = await client.keys(pattern);
  return keys;
};

const setKeyStandAlone = async (client, key, value, ttl = 300) => {
  if (!client) {
    throw new Error("Redis connection refused!");
  }

  await client.set(key, value);
  if (ttl !== 0) {
    await client.expire(key, ttl);
  }
};

const closeConnStandAlone = async (client) => {
  if (!client) {
    throw new Error("Redis connection refused!");
  }

  await client.quit();
  return;
};

module.exports = {
  setKey,
  getKey,
  delKey,
  getKeys,
  connectStandAlone,
  getKeysStandAlone,
  setKeyStandAlone,
  closeConnStandAlone,
};
