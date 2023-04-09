const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const fs = require('fs');
const keepAlive = require('./server');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions] });
const Errorhandler = require("discord-error-handler");
const handle  = new Errorhandler(client, {
  webhook: {id: process.env['webhook_id'], token: process.env['webhook_token']}
})


process.on('unhandledRejection', error => { 
  handle.createrr(client, undefined, undefined, error)
});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./events");
  client.handleCommands(commandFolders, "./commands");
  client.login(process.env['TOKEN'])
})();

keepAlive();