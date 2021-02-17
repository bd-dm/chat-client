require('dotenv').config();

const path = require('path');

module.exports = {
    webpack: (config, {dev, isServer}) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve('./src'),
            '@api': path.resolve('./src/api'),
            '@components': path.resolve('./src/components'),
            '@pages': path.resolve('./src/pages'),
            '@store': path.resolve('./src/models'),
            '@assets': path.resolve('./src/assets'),
        };

        if (dev && !isServer) {
            const originalEntry = config.entry;
            config.entry = async () => {
                const entries = await originalEntry();
                if (entries['main.js'] && !entries['main.js'].includes('./whyDidYouRender.js')) {
                    entries['main.js'].unshift('./whyDidYouRender.js');
                }
                return entries;
            };
        }

        return config;
    },
}
