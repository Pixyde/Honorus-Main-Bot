const { SlashCommandBuilder} = require('@discordjs/builders')
const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rank-and-roles-select-menu')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    )
    .setDescription('Utiliser pour faire apparaitre le menu de selection d\'élo et de rôle'),
    async execute (interaction) {

        const roleembed = new EmbedBuilder()
        .setTitle('Rôles')
        .setColor(0xD13541)

        const rankembed = new EmbedBuilder()
        .setTitle('Rang')
        .setColor(0xD13541)
        
        const rolemenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('role')
            .setMinValues(1)
            .setMaxValues(5)
            .setPlaceholder('Clique pour voir les options')
            .addOptions(
                {
                    label: 'Top',
                    value: '918932029075230740',
                    emoji: {
                        id: '990748378088489031',
                        name: 'Top'
                    }
                },
                {
                    label: 'Jungle',
                    value: '918932127238742086',
                    emoji: {
                        id: '990748373747392583',
                        name: 'Jungle'
                    }
                },
                {
                    label: 'Mid',
                    value: '918932111099056180',
                    emoji: {
                        id: '990748375374770246',
                        name: 'Mid'
                    }
                },
                {
                    label: 'Adc',
                    value: '918932159929139230',
                    emoji: {
                        id: '990748372879167529',
                        name: 'Adc'
                    }
                },
                {
                    label: 'Support',
                    value: '918932179642351667',
                    emoji: {
                        id: '990748377140580432',
                        name: 'Support'
                    }
                }
            ),
        )
        const rankmenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('rank')
            .setMaxValues(1)
            .setPlaceholder('Clique pour voir les options')
            .addOptions(
                {
                    label: 'Challenger',
                    value: '990749351737458749',
                    emoji: {
                        id: '990748169920999424',
                        name: 'Challenger'
                    }
                },
                {
                    label: 'GrandMaster',
                    value: '990749308259303487',
                    emoji: {
                        id: '990748171078598716',
                        name: 'GrandMaster'
                    }
                },
                {
                    label: 'Master',
                    value: '990749273257832448',
                    emoji: {
                        id: '990748176250208318',
                        name: 'Master'
                    }
                },
                {
                    label: 'Diamond',
                    value: '990749164642107452',
                    emoji: {
                        id: '990748173389668352',
                        name: 'Diamond'
                    }
                },
                {
                    label: 'Platinum',
                    value: '990749070505177099',
                    emoji: {
                        id: '990748168251670529',
                        name: 'Platinium'
                    }
                },
                {
                    label: 'Gold',
                    value: '990746567889805322',
                    emoji: {
                        id: '990748166657835041',
                        name: 'Gold'
                    }
                },
                {
                    label: 'Silver',
                    value: '990748998337986560',
                    emoji: {
                        id: '990748172383031317',
                        name: 'Silver'
                    }
                },
                {
                    label: 'Bronze',
                    value: '990746494162329691',
                    emoji: {
                        id: '990748174765420544',
                        name: 'Bronze'
                    }
                },
                {
                    label: 'Iron',
                    value: '990746334090903563',
                    emoji: {
                        id: '990748178930343936',
                        name: 'Iron'
                    }
                }
            ),
        )

        await interaction.channel.send({ embeds: [roleembed], components: [rolemenu]})
        await interaction.channel.send({ embeds: [rankembed], components: [rankmenu]})
        reply = await interaction.reply({ content: "Creation du menu..." })
        setTimeout(() => interaction.deleteReply(), 1000)
    }
}