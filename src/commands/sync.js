const { EmbedBuilder } = require('discord.js');
const youtubeService = require('../platforms/youtube/service');

module.exports = {
    name: 'sync',
    adminOnly: true,
    async execute(message, args, client) {
        const loadingMsg = await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0xFFAA00)
                    .setTitle('Syncing...')
                    .setDescription('Fetching videos from YouTube. Please wait.')
            ]
        });

        const result = await youtubeService.syncVideos(client, 10);

        if (result.failed) {
            return loadingMsg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xED4245)
                        .setTitle('Sync Failed')
                        .setDescription('Could not reach the YouTube API. Check the logs.')
                ]
            });
        }

        if (result.added === 0) {
            return loadingMsg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x5865F2)
                        .setTitle('Sync Complete')
                        .setDescription('No new videos found. Everything is up to date.')
                        .setFooter({ text: `Fetched: ${result.fetched} | Added: 0` })
                ]
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0x57F287)
            .setTitle('Sync Complete')
            .setDescription(`Added **${result.added}** new video(s) to the cache.`)
            .setFooter({
                text: `Fetched: ${result.fetched} | Added: ${result.added} | Notified: ${result.notified}`
            });

        if (result.todayVideo) {
            embed.addFields({
                name: 'Notified',
                value: `**${result.todayVideo.title}** (published today)`,
                inline: false
            });
        } else {
            embed.addFields({
                name: 'Notification',
                value: 'No videos published today — nothing was sent.',
                inline: false
            });
        }

        await loadingMsg.edit({ embeds: [embed] });
    }
};