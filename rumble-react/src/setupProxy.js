const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://sddec25-16.ece.iastate.edu:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onError: function(err, req, res) {
        console.log('Proxy error:', err);
      },
      onProxyReq: function(proxyReq, req, res) {
        console.log('Proxying request to:', req.url);
      }
    })
  );
  
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://sddec25-16.ece.iastate.edu:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
  
  app.use(
    '/robots',
    createProxyMiddleware({
      target: 'http://sddec25-16.ece.iastate.edu:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};