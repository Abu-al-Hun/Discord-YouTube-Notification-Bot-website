```markdown
# Discord YouTube Notification Bot

A lightweight Discord bot that syncs YouTube videos on demand, caches them locally, and sends notifications only for videos published today.

---

## Features

- Single YouTube channel support
- Manual sync via a command (no background polling, no API waste)
- Local JSON cache of videos
- Notifications only for videos published **today**
- Duplicate-safe: cached videos are never notified again
- Interactive dropdown menus for browsing and deleting cached videos
- Admin-only commands with permission checks
- Channel-restricted command execution
- Multi-platform folder structure ready for future expansion

---

## Project Structure

```

```
discord-youtube-bot/
├── config.js
├── index.js
├── package.json
└── src/
    ├── data/
    │   └── youtube.json
    ├── events/
    │   ├── ready.js
    │   └── messageCreate.js
    ├── platforms/
    │   └── youtube/
    │       ├── api.js
    │       └── service.js
    ├── commands/
    │   ├── list.js
    │   ├── sync.js
    │   ├── deleteProject.js
    │   └── help.js
    └── utils/
        ├── notification.js
        └── jsonStore.js
```
```


## Requirements

- Node.js 18 or higher
- A Discord application with a bot
- A YouTube Data API v3 key
- Administrator permission on the target Discord server

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Configuration

Edit `config.js` and fill in the required values:

```javascript
module.exports = {
    discordToken: 'YOUR_DISCORD_BOT_TOKEN',
    discordChannelId: 'YOUR_NOTIFICATION_CHANNEL_ID',
    prefix: '-',

    commands: {
        allowedChannelId: 'YOUR_COMMANDS_CHANNEL_ID'
    },

    youtube: {
        apiKey: 'YOUR_YOUTUBE_API_KEY',
        channelId: 'YOUR_YOUTUBE_CHANNEL_ID',
        cacheMaxVideos: 50,
        notificationMessage: '🎬 **New video on YouTube!**',
        mentionEveryone: true
    }
};
```

### Configuration Keys

| Key | Description |
|-----|-------------|
| `discordToken` | Bot token from the Discord Developer Portal |
| `discordChannelId` | Channel where notifications are sent |
| `prefix` | Command prefix |
| `commands.allowedChannelId` | Channel where the `list` command is allowed |
| `youtube.apiKey` | YouTube Data API v3 key |
| `youtube.channelId` | Target YouTube channel ID |
| `youtube.cacheMaxVideos` | Maximum number of videos stored in the JSON cache |
| `youtube.notificationMessage` | Description text used in the notification embed |
| `youtube.mentionEveryone` | Whether to mention `@everyone` on notifications |

---

## Discord Setup

1. Create an application at https://discord.com/developers/applications
2. Create a bot and copy its token into `config.js`
3. Enable **Message Content Intent** under the Bot settings
4. Invite the bot to your server with the following scopes:
   - `bot`
   - `applications.commands`
5. Required bot permissions:
   - `Send Messages`
   - `Embed Links`
   - `Read Message History`

---

## YouTube Setup

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable **YouTube Data API v3**
4. Create an API key under **Credentials**
5. Paste the API key into `config.js`
6. Copy the target channel ID and paste it into `config.js`

---

## Usage

Start the bot:

```bash
node index.js
```

Available commands:

| Command | Permission | Description |
|---------|------------|-------------|
| `-list` | Allowed channel only | Shows a dropdown of cached videos |
| `-sync` | Administrator | Fetches new videos from YouTube |
| `-deleteproject` | Administrator | Removes a cached video via dropdown |
| `-help` | Administrator | Shows the help menu |

---

## How Syncing Works

1. An administrator runs `-sync`.
2. The bot fetches the latest videos from YouTube.
3. Videos already in the cache are skipped.
4. New videos are added to `src/data/youtube.json`.
5. Only videos published **today** trigger a notification.
6. Older videos are cached silently.

This design minimizes YouTube API usage and avoids quota exhaustion.

---

## Data Storage

Videos are stored in `src/data/youtube.json`:

```json
{
  "videos": [
    {
      "id": "dQw4w9WgXcQ",
      "title": "Example Video",
      "description": "BABYMONSTER - 'DRIP' M/V",
      "publishedAt": "2024-01-11T12:00:00.000Z",
      "link": "https://youtu.be/Zp-Jhuhq0bQ",
      "thumbnail": "https://i.ytimg.com/vi/Zp-Jhuhq0bQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBvkg0Cq_qUDUfCofN_bI3BFNTatg"
    }
  ]
}
```

---

## Notes

- No automatic polling. Syncing is fully manual.
- Notifications are triggered only for videos published on the current day.
- The cache file is created automatically on first run.
- All admin-only commands work in any channel.
- The `list` command is restricted to the channel defined in `config.js`.

---

## License & Copyright

```
Copyright (c) 2023 - 2026 Hany Samir Mansour (Abu Al-houn)
All rights reserved.
```

This project is the exclusive property of **Hany Samir Mansour**, known as **Abu Al-houn**.

### Terms of Use

- Commercial use of this project, in whole or in part, is **strictly prohibited**.
- Redistribution, resale, sublicensing, or any form of commercial exploitation is **not permitted** without prior written consent from the copyright holder.
- Modification for personal, non-commercial use is allowed.
- Any derivative work must retain this copyright notice and these terms.

For commercial licensing inquiries, contact:

- Email: support@abualhoun.dpdns.org
- Website: https://abualhoun.dpdns.org/

---

## Contact

- Name: Hany Samir Mansour (Abu Alhoun)
- Email: support@abualhoun.dpdns.org
- Discord: abualhun
- Website: https://abualhoun.dpdns.org/
```
The file is ready. Everything is in English, the copyright is set to your name and alias, the year range is `2023 - 2026`, and commercial use is explicitly prohibited.

Want me to also generate a separate `LICENSE` file with the same terms for cleaner repository structure?
