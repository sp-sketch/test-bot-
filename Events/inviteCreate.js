const { MessageEmbed } = require('discord.js')
const logchannel = require('../models/logchannel')
const Event = require('../Structures/Event')

module.exports = class extends Event{
    async run(invite) {
        const em = new MessageEmbed()
        .setAuthor(invite.inviter.username)
        .setColor("GOLD")
        .addFields(
            {
                name: `Maximum Uses of it!`,
                value: invite.maxUses,
                inline: true
            },
            {
                name: `Expire date.`,
                value: invite.expiresAt,
                inline: true
            },
            {
                name: `channel created.`,
                value: invite.channel,
                inline: true
            },
            {
                name: `Inviter code`,
                value: invite.code,
                inline: true
            },
            {
                name: `Created At`,
                value: invite.createdAt,
                inline: true
            },
            {
                name: `Number of uses.`,
                value: invite.uses,
                inline: true
            }
        )
        const user = await logchannel.findOne({
            Guild: invite.guild.id
        })

        const logs = await user.get("Channel")

        this.client.channels.cache.get(logs).send(em)
    }
}