const { PermissionsBitField } = require('discord.js');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(client.config.prefix)) return;

        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/);

        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (!command) return;

        const isAdmin = message.member.permissions.has(
            PermissionsBitField.Flags.Administrator
        );

        if (command.adminOnly) {
            if (!isAdmin) {
                return message.reply({
                    content: 'You need Administrator permission to use this command.'
                }).catch(() => {});
            }
        } else {
            const allowedChannelId = client.config.commands?.allowedChannelId;
            if (allowedChannelId && message.channel.id !== allowedChannelId) {
                return;
            }
        }

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(`Error executing command ${commandName}:`, error);
            message.reply('An error occurred while executing the command.').catch(() => {});
        }
    });
};