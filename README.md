# 📄 `README.md`

Save the following as `README.md` in the project root.

```markdown
# Discord YouTube Notification Bot

A lightweight Discord bot that syncs YouTube videos on demand, caches them locally, and sends notifications only for videos published today.

---

## About

Discord YouTube Notification Bot is a simple and efficient tool designed for Discord server owners who want to keep their community updated with new YouTube uploads — without wasting YouTube API quota or spamming notifications for old videos.

The bot stores every synced video in a local JSON cache, skips videos that were already processed, and only sends a notification when a video is published on the current day. Syncing is fully manual, triggered by an administrator using a single command, which keeps API usage extremely low and prevents quota exhaustion.

It is ideal for content creators, community managers, and small servers that need a reliable notification system without the overhead of constant polling.

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

## Download

| Version | Download Link |
|---------|---------------|
| **v1.0** | [Download v1.0](https://github.com/Abu-al-Hun/Discord-YouTube-Notification-Bot-website/releases/download/Discord-YouTube-Notification-Bot-website/Discord-YouTube-Notification-Bot-website.v.1.0.zip) |
| **v2.0** | [Download v2.0](https://github.com/Abu-al-Hun/Discord-YouTube-Notification-Bot-website/releases/download/Discord-YouTube-Notification-Bot-website/Discord-YouTube-Notification-Bot-website.v.2.0.zip) |

---

## Requirements

- Node.js 18 or higher
- A Discord application with a bot
- A YouTube Data API v3 key
- Administrator permission on the target Discord server

---

## How to Run

### Option 1 — Windows (Recommended)

1. Download and extract the project.
2. Double-click `install-start.bat`.
3. Choose an option from the menu:
   - `[1]` Install & Run
   - `[2]` Install Dependencies Only
   - `[3]` Run Bot
   - `[4]` Project Info
   - `[5]` Exit

### Option 2 — Manual

Open a terminal in the project folder and run:

```bash
npm install
node index.js
```

---

## Configuration

Before running the bot, open `config.js` and fill in your details:

- Discord bot token
- Notification channel ID
- Allowed commands channel ID
- YouTube API key
- YouTube channel ID
- Command prefix
- Notification message and mention preference

---

## Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `-list` | Allowed channel only | Shows a dropdown of cached videos |
| `-sync` | Administrator | Fetches new videos from YouTube |
| `-deleteproject` | Administrator | Removes a cached video via dropdown |
| `-help` | Administrator | Shows the help menu |

---

## How It Works

1. An administrator runs `-sync`.
2. The bot fetches the latest videos from the configured YouTube channel.
3. Videos already stored in the cache are skipped.
4. New videos are added to `src/data/youtube.json`.
5. Only videos published **today** trigger a Discord notification.
6. Older videos are cached silently without notifying anyone.

This design keeps the bot fast, reliable, and API-friendly.

---

## License & Copyright

```
Copyright (c) 2023 - 2026 Hany Samir Mansour (Abu Al-Houn)
All rights reserved.
```

This project is the exclusive property of **Hany Samir Mansour**, known as **Abu Al-Houn**.

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

- Name: Hany Samir Mansour (Abu Al-Houn)
- Email: support@abualhoun.dpdns.org
- Discord: abualhun
- Website: https://abualhoun.dpdns.org/
```

---

## 📌 What Changed

- Removed all technical details: project structure, config keys table, Discord setup steps, YouTube setup steps, data storage JSON example, and sync explanation.
- Kept only: general description, features, download links, requirements, how to run, configuration summary, commands table, a short "How It Works", and the license/copyright section.
- Added a **Download** section with both release links (v1.0 and v2.0).
- Standardized the alias as **Abu Al-Houn** throughout the file.

Want me to also generate a `CHANGELOG.md` describing what's new in v2.0 compared to v1.0?
