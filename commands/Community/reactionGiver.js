const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord.js')
const database = {
    reactionRoleGiver: require("../../database/reactionRoleGiver.json")
}
const {writeFile} = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-reaction-giver')
    .setDescription('Ajoute un effet qui donne un rôle après clic sur réaction d\'un message')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    )
    .addStringOption(role => role.setName('message_id').setDescription('L\'ID du message pour donner la réaction').setRequired(true))
    .addChannelOption(role => role.setName('channel').setDescription('Le channel dans lequel se trouve le message').setRequired(true))  
    .addRoleOption(role => role.setName('rôle').setDescription('Le rôle à donner après la réaction').setRequired(true)),
    async execute(interaction, client) {
        const channel_ID = interaction.options.get("channel").channel.id
        const role_ID = interaction.options.get("rôle").role.id
        const message_ID = interaction.options.get("message_id").value

        database.reactionRoleGiver[message_ID] = {
            role_ID: role_ID,
            channel_ID: channel_ID
        }

        writeFile("./database/reactionRoleGiver.json", JSON.stringify(database.reactionRoleGiver), async (err) => {
            if (err)
              console.log(err);
            else {
                await interaction.reply({ content: "Création effectuée", ephemeral: true})
            }
        })
    }
}