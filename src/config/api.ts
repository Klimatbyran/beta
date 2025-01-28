export default {
  BASE_URL: import.meta.env.DEV
    ? 'http://localhost:3000/api'
    : 'https://api.klimatkollen.se/api',
}
