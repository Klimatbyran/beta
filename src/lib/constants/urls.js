const nodeEnv = process.env.NODE_ENV;

export const API_BASE_URL =
  nodeEnv === "production"
    ? "https://api.klimatkollen.se"
    : nodeEnv === "staging"
    ? "https://stage.api.klimatkollen.se"
    : "https://api.klimatkollen.se";
