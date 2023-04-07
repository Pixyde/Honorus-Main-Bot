const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-message')
    .setDescription('Supprime l\'effet donneur de réaction d\'un message')
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    )
    .addStringOption(option => option.setName('titre').setDescription('Le titre du message').setRequired(true))
    .addStringOption(option => option.setName('message_id').setDescription('L\'ID du message a écrire').setRequired(true))
    .addChannelOption(option => option.setName('channel').setDescription('Le channel dans lequel se trouve le message').setRequired(true))
    .addStringOption(option => option.setName('button').setDescription('Ajouter des button en écrivant [customid]&[text]²[style]<[customid]>[text]>[style]'))
    .addRoleOption(option => option.setName('ping').setDescription('Ajouter un role que le bot va ping'))
    .addAttachmentOption(option => option.setName('fichier-joint').setDescription('Ajouter des fichiers joints')),
  async execute(interaction, client) {
    const channel = interaction.options.get("channel").channel
    const message = await channel.messages.fetch(interaction.options.get("message_id").value)
    const interactionChannel = interaction.channel
    const attachment = interaction.options.get("fichier-joint")
    const rolePing = interaction.options.get("ping") ? "<@&" + interaction.options.get("ping").role.id + ">" : null

    const messageEmbed = new EmbedBuilder()
      .setTitle(interaction.options.get("titre").value)
      .setColor(0xD13541)
      .setDescription(message.content)

    if (attachment) {
      messageEmbed.setImage(attachment.attachment.url)
    }

    const buttonHolder = new ActionRowBuilder();

    if (interaction.options.get("button")) {
      const buttonMessage = interaction.options.get("button").value
      const buttons = buttonMessage.split("²")

      for (var i in buttons) {
        const buttonOptions = buttons[i].split("&")
        buttonHolder.addComponents(
          new ButtonBuilder()
            .setCustomId(buttonOptions[0])
            .setLabel(buttonOptions[1])
            .setStyle(Number(buttonOptions[2])),
        )
      }
      interaction.reply("Message crée")
      interactionChannel.send({ content: rolePing, embeds: [messageEmbed], components: [buttonHolder] })
      setTimeout(() => interaction.deleteReply(), 3000)
    } else {
      interaction.reply("Message crée")
      interactionChannel.send({ content: rolePing, embeds: [messageEmbed] })
      setTimeout(() => interaction.deleteReply(), 3000)
    }

  }
}
