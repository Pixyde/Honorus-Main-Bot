const { Interaction } = require("discord.js");

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
      
    if (interaction.customId=== "silver/gold") {
      if (interaction.member.roles.cache.some(r => r.id === '1023762666994532384')) {
        interaction.reply({ content: "Enlevez votre rôle actuel en cliquant sur le bouton correspondant pour pouvoir sélectionner un nouveau rôle", ephemeral: true })
      } else {
        if (interaction.member.roles.cache.some(r => r.id === "1023458418939416636")) {
          interaction.member.roles.remove('1023458418939416636')
          interaction.member.roles.remove('1085666164501397604')
        }          
        else {
          interaction.member.roles.add('1023458418939416636')
          interaction.member.roles.add('1085666164501397604')
        }          
        interaction.reply({ content: "Mise a jour des roles effectuer", ephemeral: true })
      }
    }
    else if (interaction.customId === "plat/master") {
      if (interaction.member.roles.cache.some(r => r.id === '1023458418939416636')) {
        interaction.reply({ content: "Enlevez votre rôle actuel en cliquant sur le bouton correspondant pour pouvoir sélectionner un nouveau rôle", ephemeral: true })
      } else {
        if (interaction.member.roles.cache.some(r => r.id === "1023762666994532384")) {
          interaction.member.roles.remove('1023762666994532384')
          interaction.member.roles.remove('1085666164501397604')
        }          
        else {
          interaction.member.roles.add('1023762666994532384')
          interaction.member.roles.add('1085666164501397604')
        }          
        interaction.reply({ content: "Mise a jour des roles effectuer", ephemeral: true })
      }
    } 
  },
};