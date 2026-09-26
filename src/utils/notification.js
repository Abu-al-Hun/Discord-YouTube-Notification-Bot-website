const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function sendNotification(client, video) {
    try {
        const channel = await client.channels.fetch(client.config.discordChannelId);

        if (!channel) {
            console.error('Discord channel not found. Check the channel ID.');
            return;
        }

        if (!channel.isTextBased()) {
            console.error('The specified channel is not a text channel.');
            return;
        }

        const channelInfo = client.platforms.youtube.channelInfo;

        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(video.title)
            .setURL(video.link)
            .setAuthor({
                name: channelInfo.title,
                iconURL: channelInfo.thumbnail,
                url: `https://www.youtube.com/channel/${client.config.youtube.channelId}`
            })
            .setDescription(client.config.youtube.notificationMessage)
            .setImage(video.thumbnail)
            .setFooter({ text: 'YouTube Notifications' });

        const button = new ButtonBuilder()
            .setLabel('Watch on YouTube')
            .setStyle(ButtonStyle.Link)
            .setURL(video.link);

        const row = new ActionRowBuilder().addComponents(button);

        await channel.send({
            content: client.config.youtube.mentionEveryone ? '@everyone' : '',
            embeds: [embed],
            components: [row]
        });

        console.log(`Notification sent: ${video.title}`);
    } catch (error) {
        console.error('Error sending notification:',
            error.response?.data?.error?.message || error.message);
    }
}

module.exports = { sendNotification };