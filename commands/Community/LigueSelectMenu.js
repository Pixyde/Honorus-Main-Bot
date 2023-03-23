const { SlashCommandBuilder} = require('@discordjs/builders')
const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ligue-select-menu')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    )
    .setDescription('Utiliser pour faire apparaitre le menu de selection de la ligue et des ligue rank'),
    async execute (interaction) {

        const ligueRankEmbed = new EmbedBuilder()
        .setTitle('Ligue Rank')
        .setColor(0xD13541)
        
        const ligueRankMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('ligueRank')
            .setMaxValues(1)
            .setPlaceholder('Clique pour voir les options')
            .addOptions(
                {
                    label: 'Ligue Silver/Gold',
                    value: 'silver/gold',     
                },
                {
                    label: 'Ligue Plat/Master',
                    value: 'plat/master',
                }
            ),
        )
      
        await interaction.channel.send({ embeds: [ligueRankEmbed], components: [ligueRankMenu]})
        reply = await interaction.reply({ content: "Creation du menu..." })
        setTimeout(() => interaction.deleteReply(), 1000)
    }
}