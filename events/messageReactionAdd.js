const { Interaction } = require("discord.js");
const database = {
    reactionRoleGiver: require("../database/reactionRoleGiver.json")
}

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
      const guild = reaction.message.guild
      const member = await guild.members.cache.get(user.id)
      
      if (reaction.message.id == "1086428754554929322") {
        member.roles.add('989276250533158912')
        member.roles.add('1086623412639760384')
        member.roles.add('1085666299377627367')
        member.roles.add('1085666415756984421')
      }

      setInterval(async () => {
            database.reactionRoleGiver = require("../database/reactionRoleGiver.json")
        }, 15 * 1000)

      for (var key in database.reactionRoleGiver) {
        const channel = guild.channels.cache.get(database.reactionRoleGiver[key].channel_ID)
        const message = await channel.messages.fetch(key)

        if(reaction.message == message){
            const member = await guild.members.cache.get(user.id)
            member.roles.add(database.reactionRoleGiver[key].role_ID)
        } 
      } 
    },
};