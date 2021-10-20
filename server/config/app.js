module.exports = {
    development: {
        serverPort: process.env.DEV_SERVER_PORT,
        clientUrl: process.env.DEV_CLIENT_URL
    },
    test: {
        serverPort: '',
        clientUrl: ''
    },
    production: {
        serverPort: '',
        clientUrl: ''
    }
}
