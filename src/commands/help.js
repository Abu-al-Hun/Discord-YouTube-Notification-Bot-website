const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    adminOnly: true,
    async execute(message, args, client) {
        const prefix = client.config.prefix;

        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Bot Commands')
            .setDescription('Below is the list of available commands.')
            .addFields(
                {
                    name: `${prefix}list`,
                    value: 'Shows a dropdown menu of all cached YouTube videos.',
                    inline: false
                },
                {
                    name: `${prefix}sync`,
                    value: 'Fetches the latest videos from YouTube and stores them.\nOnly videos published **today** trigger a notification.\n**Requires Administrator.**',
                    inline: false
                },
                {
                    name: `${prefix}deleteproject`,
                    value: 'Shows a dropdown menu to delete a video from the cache.\n**Requires Administrator.**',
                    inline: false
                }
            )
            .setFooter({ text: 'Bot Help' })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};