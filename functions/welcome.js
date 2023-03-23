const { EmbedBuilder } = require("@discordjs/builders")

module.exports = (client) => {
  client.on("guildMemberAdd", member => {

    const channel = client.channels.cache.get('984917113934348369')

    message = new EmbedBuilder()
      .setTitle('Bienvenue chez Honorus, Invocateur.')
      .setDescription('Nous sommes une structure de coaching LoL, ouverte à tous, axée sur la bienveillance et le partage. Mais pas que ! \nNous vous préparons tout plein de belles choses comme nos ligues internes, des évènements et des tournois avec ou sans Cashprizes. \n\nPour avoir accès à toutes les fonctionnalités du serveur, veillez à valider le \n[#⬛╿règlement](https://discord.com/channels/918836855817007115/987105867835007116) et sélectionner vos [#⬛╿rôles](https://discord.com/channels/918836855817007115/1083160186522447902). \nPour toute information complémentaire, veuillez consulter le channel [#⬛╿faq](https://discord.com/channels/918836855817007115/1028032861414109205).  \nA bientôt sur la faille !')
      .setColor(0xD13541)

    member.send({
      embeds: [message]
    })

    channel.send({
      content: "<@" + member.user.id + ">",
      embeds: [message]
    })
  })
}