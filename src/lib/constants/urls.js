export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.klimatkollen.se"
    : process.env.NODE_ENV === "staging"
    ? "https://stage.api.klimatkollen.se"
    : "http://localhost:3000";
