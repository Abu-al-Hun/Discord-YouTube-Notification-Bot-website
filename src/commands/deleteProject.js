const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ComponentType
} = require('discord.js');
const { load, save } = require('../utils/jsonStore');

const CACHE_FILE = 'youtube.json';

module.exports = {
    name: 'deleteproject',
    adminOnly: true,
    async execute(message, args, client) {
        const state = client.platforms.youtube;
        const videos = state.videos || [];

        if (!videos.length) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xED4245)
                        .setTitle('No Videos')
                        .setDescription('The cache is empty. Nothing to delete.')
                ]
            });
        }

        const menuVideos = videos.slice(0, 25);

        const embed = new EmbedBuilder()
            .setColor(0xED4245)
            .setTitle('Delete a Video')
            .setDescription('Select a video from the dropdown below to delete it from the cache.')
            .setFooter({ text: `Total: ${videos.length} videos` });

        const menu = new StringSelectMenuBuilder()
            .setCustomId('delete_video_select')
            .setPlaceholder('Select a video to delete')
            .addOptions(
                menuVideos.map((video, index) => ({
                    label: video.title.length > 100
                        ? video.title.slice(0, 97) + '...'
                        : video.title,
                    value: video.id,
                    description: `Video #${index + 1}`
                }))
            );

        const row = new ActionRowBuilder().addComponents(menu);

        const sentMsg = await message.reply({
            embeds: [embed],
            components: [row]
        });

        const collector = sentMsg.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000
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
            const index = state.videos.findIndex((v) => v.id === videoId);

            if (index === -1) {
                collector.stop('notfound');
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xED4245)
                            .setTitle('Video Not Found')
                    ],
                    components: []
                });
            }

            const [removed] = state.videos.splice(index, 1);

            save(CACHE_FILE, {
                videos: state.videos
            });

            console.log(`Deleted video: ${removed.title}`);

            collector.stop('deleted');

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x57F287)
                        .setTitle('Video Deleted')
                        .setDescription(`Deleted: **${removed.title}**`)
                        .setFooter({ text: `Remaining: ${state.videos.length} videos` })
                ],
                components: []
            });
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'deleted' || reason === 'notfound') return;
            try {
                await sentMsg.edit({ components: [] });
            } catch (e) {}
        });
    }
};