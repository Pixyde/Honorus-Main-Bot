const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mass-add-role')
    .setDescription('Ajoute un rôle à tout les membres du serveur')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    )
    .addRoleOption(role => role.setName('rôle').setDescription('Le rôle à ajouter aux membres').setRequired(true)),
    async execute(interaction, client) {
        const role = interaction.options.get("rôle").role

        const guild = await interaction.guild
        const members = await guild.members.fetch()

        await interaction.reply({ content: "Commencement de l'ajout des rôles, temps estimé : " + (members.size * 333) / 1000 + " secondes"})

        setTimeout(async() => {
            let n = 0

            await interaction.editReply("Ajout des rôles en cours...")
    
            members.forEach(member => {
                setTimeout(async () => {
                    member.roles.add(role);
                }, (n++ * 333));
            });

            setTimeout(async () => {
                await interaction.editReply("<@" + interaction.user.id + "> Ajout des rôles éffectué")
            }, ((n + 1) * 333))
        }, 5000)

    }
}