const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/swagger",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7034',
        secure: false
    });

    app.use(appProxy);
};
