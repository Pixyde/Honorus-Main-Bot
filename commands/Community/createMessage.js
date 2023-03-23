const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-message')
    .setDescription('Supprime l\'effet donneur de réaction d\'un message')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    )
    .addStringOption(role => role.setName('titre').setDescription('Le titre du message').setRequired(true))
    .addStringOption(role => role.setName('message_id').setDescription('L\'ID du message a écrire').setRequired(true))
    .addChannelOption(role => role.setName('channel').setDescription('Le channel dans lequel se trouve le message').setRequired(true))
    .addStringOption(role => role.setName('button').setDescription('Ajouter des button en écrivant [customid]&[text]²[style]<[customid]>[text]>[style]')),
    async execute(interaction, client) {
        const channel = interaction.options.get("channel").channel
        const message = await channel.messages.fetch(interaction.options.get("message_id").value)
        const interactionChannel = interaction.channel
        

        const messageEmbed = new EmbedBuilder()
        .setTitle(interaction.options.get("titre").value)
        .setColor(0xD13541)
        .setDescription(message.content)

        const buttonHolder = new ActionRowBuilder();

        if (interaction.options.get("button") != null) {
          const buttonMessage = interaction.options.get("button").value
          const buttons = buttonMessage.split("²")

          for(var i in buttons) {
          const buttonOptions = buttons[i].split("&")
          buttonHolder.addComponents(
            new ButtonBuilder()
					   .setCustomId(buttonOptions[0])
					   .setLabel(buttonOptions[1])
					   .setStyle(Number(buttonOptions[2])),
            )
          }
          interaction.reply("Message crée")        
          interactionChannel.send({embeds : [messageEmbed], components: [buttonHolder]})
          setTimeout(() => interaction.deleteReply(), 3000)
        } else {
          interaction.reply("Message crée")        
          interactionChannel.send({embeds : [messageEmbed]})
          setTimeout(() => interaction.deleteReply(), 3000)
        }
        
    }
}
