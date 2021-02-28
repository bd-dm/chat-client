require('dotenv').config();

const path = require('path');

module.exports = {
    webpack: (config, {dev, isServer}) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve('./src'),
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
    images: {
        domains: ['bd-dm-chat-attachments.s3.eu-north-1.amazonaws.com', ''],
    },
}
