const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.config = config;
client.commands = new Collection();
client.platforms = {
    youtube: {
        channelInfo: null,
        videos: []
    }
};

client.commands.set('list', require('./src/commands/list'));
client.commands.set('deleteproject', require('./src/commands/deleteProject'));
client.commands.set('help', require('./src/commands/help'));
client.commands.set('sync', require('./src/commands/sync'));

require('./src/events/ready')(client);
require('./src/events/messageCreate')(client);

client.on('error', (error) => {
    console.error('Client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
});

client.login(config.discordToken);