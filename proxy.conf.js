const PROXY_CONFIG = [
    {
        context: '/api',
        target: 'https://api.spotify.com/v1/me:8080',
        // pathRewrite: { '^/api': '' }
    }
]

module.exports = PROXY_CONFIG;