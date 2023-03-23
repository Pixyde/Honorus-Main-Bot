const database = {
  reactionRoleGiver: require("../database/reactionRoleGiver.json")
}

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log('Ready!');

    const guild = await client.guilds.fetch('918836855817007115')
    const ruleChannel = guild.channels.cache.get('987105867835007116')
    const ruleMessage = await ruleChannel.messages.fetch('1086428754554929322')

    setInterval(async () => {
      database.reactionRoleGiver = require("../database/reactionRoleGiver.json")
      for (var key in database.reactionRoleGiver) {
        const channel = guild.channels.cache.get(database.reactionRoleGiver[key].channel_ID)
        const message = await channel.messages.fetch(key)
      }
    }, 15 * 1000)

    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);

      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,

            },

          ],

          status: statusArray[option].status
        })
      } catch (error) {
        console.error(error);
      }
    }
  },
};