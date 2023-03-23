const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord.js')
const database = {
    reactionRoleGiver: require("../../database/reactionRoleGiver.json")
}
const {writeFile} = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-reaction-giver')
    .setDescription('Supprime l\'effet donneur de réaction d\'un message')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    )
    .addStringOption(role => role.setName('message_id').setDescription('L\'ID du message dont on doit supprimer l\'effet').setRequired(true)),
    async execute(interaction, client) {
        const message_ID = interaction.options.get("message_id").value
        
        if (!database.reactionRoleGiver[message_ID]) {
            return await interaction.reply({ content: "Il n'existe pas d'effet donneur de réaction lié à ce message", ephemeral: true})
        }

        database.reactionRoleGiver[message_ID] = null

        delete database.reactionRoleGiver[message_ID]

        console.log(database.reactionRoleGiver)

        writeFile("./database/reactionRoleGiver.json", JSON.stringify(database.reactionRoleGiver), async (err) => {
            if (err)
              console.log(err);
            else {
                await interaction.reply({ content: "Suppression effectuée", ephemeral: true})
            }
        })
    }
}