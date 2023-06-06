const constants = {
  CLIENT_ID: "d8bee504aed5aa23d215",

  GITHUB_URL: "https://github.com",
  PROXY_API_URL: "http://localhost:8080/api"
};

export const PROXY_API = {
  TOKEN: constants.PROXY_API_URL + "/auth/token",
  USER: constants.PROXY_API_URL + "/user/info",
  REPOS: constants.PROXY_API_URL + "/user/repositories"
};

export const GITHUB_API = {
  LOGIN: constants.GITHUB_URL
    + "/login/oauth/authorize?client_id="
    + constants.CLIENT_ID
};
