const { Interaction } = require("discord.js");

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isStringSelectMenu()) return

    if (interaction.customId === 'role') {

      await interaction.values.forEach(async element => {
        if (interaction.member.roles.cache.some(r => r.id === element))
          interaction.member.roles.remove(element)
        else
          interaction.member.roles.add(element)
      });

      interaction.reply({ content: "Mise a jour des roles effectuer", ephemeral: true })
    }

    if (interaction.customId === 'rank') {

      await interaction.values.forEach(async element => {
        if (interaction.member.roles.cache.some(r => r.id === element))
          interaction.member.roles.remove(element)
        else
          interaction.member.roles.add(element)
      });

      interaction.reply({ content: "Mise a jour des roles effectuer", ephemeral: true })

    }
  },
};