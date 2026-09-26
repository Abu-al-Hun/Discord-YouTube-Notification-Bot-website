/**
 * Discord YouTube Notification Bot
 * Copyright (c) 2023 - 2026 Hany Samir Mansour (Abu Alhoun)
 * All rights reserved.
 *
 * Commercial use is strictly prohibited without prior written permission.
 * Email: support@abualhoun.dpdns.org
 * Website: https://abualhoun.dpdns.org/
 */

const youtubeService = require('../platforms/youtube/service');

module.exports = (client) => {
    client.once('ready', async () => {
        console.log('====================================');
        console.log(`Logged in as ${client.user.tag}`);
        console.log('====================================');

        const info = await youtubeService.fetchChannelInfo(client);
        if (!info) {
            console.error('Failed to fetch YouTube channel info. Shutting down.');
            process.exit(1);
        }

        client.platforms.youtube.channelInfo = info;

        youtubeService.loadCache(client);

        console.log(`YouTube channel: ${info.title}`);
        console.log(`Notification channel ID: ${client.config.discordChannelId}`);
        console.log(`Prefix: ${client.config.prefix}`);
        console.log(`Cached videos: ${client.platforms.youtube.videos.length}`);
        console.log('====================================');

        console.log('Auto-polling is disabled. Use "sync" command to fetch new videos.');
    });
};