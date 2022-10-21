"use strict";

const {
  MIX_PANEL_API,
  MIX_PANEL_USERNAME,
  MIX_PANEL_USERNAME_SECRET,
  MIX_PANEL_PROJECT_ID,
  MIX_PANEL_REPORTS,
} = process.env;

const axios = require("axios").default;

const reports = String(MIX_PANEL_REPORTS).split(",");

const mixpanel = axios.create({
  baseURL: MIX_PANEL_API,
  timeout: 5000,
});

const getInsight = async (report) => {
  const auth = {
    username: MIX_PANEL_USERNAME,
    password: MIX_PANEL_USERNAME_SECRET,
  };
  const params = { project_id: MIX_PANEL_PROJECT_ID, bookmark_id: report };

  const { data } = await mixpanel.get("/insights", { auth, params });
  const { date_range, series } = data;
  return { dateRange: date_range, series };
};

const getInsights = async () => {
  const allResponse = await Promise.all(reports.map(getInsight));
  return allResponse;
};

module.exports = {
  getInsights,
};
