export default {
  BASE_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'https://api.klimatkollen.se/api',
}
