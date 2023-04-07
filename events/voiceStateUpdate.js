const { Interaction, Collection, ChannelType } = require("discord.js");
var cleanup = require("../utility/CleanUp").Cleanup(myCleanUp)
const database = {
  voiceTempSave: require("../database/voiceTempSave.json")
}
const { writeFileSync } = require("fs");
voicetemp = new Collection();
for (key in database.voiceTempSave) {
  voicetemp.set(key, database.voiceTempSave[key].member)
}
writeFileSync("./database/voiceTempSave.json", '{}', async (err) => {
  if (err)
    console.log(err)
})

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldMember, newMember) {
    const user = await newMember.guild.members.cache.get(newMember.id)

    const creationChannelCommunaute = newMember.guild.channels.cache.get('1083511395917770762')
    const creationChannelTournoi = newMember.guild.channels.cache.get('1086655913303224371')

    if (newMember.channel != null && (newMember.channel === creationChannelCommunaute || newMember.channel === creationChannelTournoi)) {
      const channel = await newMember.guild.channels.create({
        name: user.user.username,
        type: ChannelType.GuildVoice,
        parent: newMember.channel.parent,
      })
      newMember.member.voice.setChannel(channel)
      voicetemp.set(channel.id, newMember.id)
      creationChannelCommunaute.permissionOverwrites.edit(user, {
        Connect: false
      })
      creationChannelTournoi.permissionOverwrites.edit(user, {
        Connect: false
      })
      channel.permissionOverwrites.edit(user, {
        ManageChannels: true,
        ManageRoles: true
      })
    } else if (oldMember.channel) {
      if (voicetemp.get(oldMember.channel.id) == oldMember.id && oldMember.channel.members.size == 0) {
        creationChannelCommunaute.permissionOverwrites.edit(user, {
          Connect: null
        })
        creationChannelTournoi.permissionOverwrites.edit(user, {
          Connect: null
        })
        voicetemp.delete(oldMember.channel.id)
        return oldMember.channel.delete()
      }
      else if (voicetemp.get(oldMember.channel.id) == oldMember.id && oldMember.channel.members.size > 0) {
        creationChannelCommunaute.permissionOverwrites.edit(user, {
          Connect: null
        })
        creationChannelTournoi.permissionOverwrites.edit(user, {
          Connect: null
        })
        oldMember.channel.permissionOverwrites.edit(user, {
          ManageChannels: null,
          ManageRoles: null
        })
        voicetemp.delete(oldMember.channel.id)

        const member = oldMember.channel.members.first()

        oldMember.channel.permissionOverwrites.edit(member, {
          ManageChannels: true,
          ManageRoles: true
        })
        oldMember.channel.setName(member.user.username)
        voicetemp.set(oldMember.channel.id, member.user.id)
      }
    }
  },
};

function myCleanUp() {
  voicetemp.each(function(member, channel) {
    database.voiceTempSave[channel] = {
      member: member
    }
    writeFileSync("./database/voiceTempSave.json", JSON.stringify(database.voiceTempSave), async (err) => {
      if (err)
        console.log(err)
    })
  })
}