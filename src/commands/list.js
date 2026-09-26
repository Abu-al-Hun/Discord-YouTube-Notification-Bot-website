const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    ComponentType
} = require('discord.js');

module.exports = {
    name: 'list',
    async execute(message, args, client) {
        const videos = client.platforms.youtube.videos || [];
        const channelInfo = client.platforms.youtube.channelInfo;

        if (!channelInfo) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xED4245)
                        .setTitle('Not Ready')
                        .setDescription('Channel info is still loading. Try again shortly.')
                ]
            });
        }

        if (!videos.length) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xED4245)
                        .setTitle('No Videos Found')
                        .setDescription('The cache is empty.')
                ]
            });
        }

        const menuVideos = videos.slice(0, 25);

        const dbEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${channelInfo.title} — Video Database`)
            .setThumbnail(channelInfo.thumbnail)
            .setDescription('Select a video from the dropdown menu below.')
            .setFooter({ text: `Total: ${videos.length} videos` });

        const menu = new StringSelectMenuBuilder()
            .setCustomId('youtube_video_select')
            .setPlaceholder('Select a video')
            .addOptions(
                menuVideos.map((video, index) => ({
                    label: video.title.length > 100
                        ? video.title.slice(0, 97) + '...'
                        : video.title,
                    value: video.id,
                    description: `Video #${index + 1}`
                }))
            );

        const menuRow = new ActionRowBuilder().addComponents(menu);

        const sentMsg = await message.reply({
            embeds: [dbEmbed],
            components: [menuRow]
        });

        const collector = sentMsg.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 300000,
            max: 1
        });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== message.author.id) {
                return interaction.reply({
                    content: 'This menu is not for you.',
                    ephemeral: true
                });
            }

            await interaction.deferUpdate();

            const videoId = interaction.values[0];
            const video = videos.find((v) => v.id === videoId);

            if (!video) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xED4245)
                            .setTitle('Video Not Found')
                    ],
                    components: []
                });
            }

            const videoEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle(video.title)
                .setURL(video.link)
                .setAuthor({
                    name: channelInfo.title,
                    iconURL: channelInfo.thumbnail,
                    url: `https://www.youtube.com/channel/${client.config.youtube.channelId}`
                })
                .setImage(video.thumbnail)
                .setFooter({ text: 'YouTube Video' });

            const watchButton = new ButtonBuilder()
                .setLabel('Watch Video')
                .setStyle(ButtonStyle.Link)
                .setURL(video.link);

            const buttonRow = new ActionRowBuilder().addComponents(watchButton);

            await interaction.editReply({
                embeds: [videoEmbed],
                components: [buttonRow]
            });
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'limit') return;

            try {
                await sentMsg.edit({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xED4245)
                            .setTitle('No Request Received')
                            .setDescription('You did not select a video in time.')
                            .setFooter({ text: 'Timeout: 5 minutes' })
                    ],
                    components: []
                });
            } catch (e) {}
        });
    }
};