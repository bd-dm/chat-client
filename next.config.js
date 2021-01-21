require('dotenv').config();

const path = require('path');

module.exports = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve('./src'),
            '@api': path.resolve('./src/api'),
            '@components': path.resolve('./src/components'),
            '@pages': path.resolve('./src/pages'),
            '@store': path.resolve('./src/store'),
            '@assets': path.resolve('./src/assets'),
        };
        return config;
    },
}
