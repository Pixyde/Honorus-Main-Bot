const { Interaction, Collection, ChannelType } = require("discord.js");
voicetemp = new Collection();

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
        voicetemp.set(null, oldMember.id)

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