const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mass-remove-role')
    .setDescription('Enlève un rôle à tout les membres du serveur')
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    )
    .addRoleOption(role => role.setName('rôle').setDescription('Le rôle qu\'il faut oter aux membres').setRequired(true)),
  async execute(interaction, client) {
    const role = interaction.options.get("rôle").role

    const guild = await interaction.guild
    const members = await guild.members.fetch()

    await interaction.reply({ content: "Commencement de la suppression, temps estimé : " + (role.members.size * 250) / 1000 + ' secondes' })

    setTimeout(async () => {
      let n = 0

      await interaction.editReply("Ajout des rôles en cours...")

      role.members.forEach(member => {
        setTimeout(async () => {
          member.roles.remove(role);
        }, (n++ * 250));
      })

      setTimeout(async () => {
        await interaction.editReply("<@" + interaction.user.id + "> Suppression des rôles éffectué")
      }, ((n + 1) * 250))

    }, 5000)
  }
}