# Honorus Bot

A Discord bot built with discord.js v14, using slash commands, MongoDB persistence, and a small Express server so it can be kept alive on always-on-ping hosts (e.g. Replit).

## Features

- Slash command and event handling loaded dynamically from `commands/` and `events/`
- Built-in Discord error reporting via `discord-error-handler`, forwarded to a webhook
- MongoDB-backed persistence (via Mongoose) for bot data
- Community/moderation tooling, including:
  - Mass role add/remove across members
  - Reaction-role menus (add and remove)
  - Select-menu driven role/"league" assignment
  - Custom message creation for announcements
- Handles select menus, buttons, and reactions as first-class interaction types
- Lightweight `express` server (`server.js`) that keeps the process alive on free hosting tiers

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with at least:
   ```
   TOKEN=your-discord-bot-token
   webhook_id=your-error-webhook-id
   webhook_token=your-error-webhook-token
   ```
   (Add your MongoDB connection string as well, wherever `database/` expects it.)
3. Start the bot:
   ```bash
   node index.js
   ```

## Project structure

```
index.js       # entry point — loads functions, events, and commands, then logs in
server.js      # Express keep-alive server
commands/
  Community/   # slash commands (role management, reaction roles, announcements)
events/        # Discord.js event handlers (ready, reactions, interactions, voice state)
functions/     # bootstrap helpers — command/event loaders, welcome message logic
database/      # Mongoose models / DB access
utility/       # shared helper functions
```

## Notes

Errors are caught globally (`unhandledRejection`) and reported through `discord-error-handler` to a Discord webhook, so failures in commands or events don't go unnoticed.
