import axios from "axios";
import api_config from "./youtube.config";

const API_KEY = api_config.API_KEY;
const API_ROOT = api_config.API_ROOT;
const defaultParam = {
  part: "snippet",
  maxResults: 12,
  key: API_KEY,
  videoId: !null,
};

/**
 * @param {string} query
 */
const getVideosDefaultQuery = (query) => {
  const params = { ...defaultParam, q: query };

  return axios({
    method: "get",
    url: API_ROOT + "search",
    params: params,
  });
};

/**
 * @param {Object} querySetting 
 * @param {string} querySetting.q - query
 * @param {string} querySetting.order - order by
 * @param {number} querySetting.maxResults
 */
const getVideosUserQuery = (querySetting) => {
  const updated = clearObject(querySetting);
  console.log(updated);
  const userParams = { ...defaultParam, ...clearObject(querySetting)};

  return axios({
    method: "get",
    url: API_ROOT + "search",
    params: userParams,
  });
};


const clearObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
}
export default {
  getVideosDefaultQuery,
  getVideosUserQuery,
};
