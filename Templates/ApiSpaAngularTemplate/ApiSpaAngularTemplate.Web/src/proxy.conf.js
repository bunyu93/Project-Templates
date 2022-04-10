const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/swagger"
    ],
    target: "https://localhost:7122",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
