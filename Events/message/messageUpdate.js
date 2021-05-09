const Event = require('../../Structures/Event')
const MyEmbed = require('../../Structures/Myembed')
const { Util: { escapeMarkdown}} = require('discord.js')
const {diffWordsWithSpace} = require('diff');
const logchannel = require('../../models/logchannel');

module.exports = class extends Event{
    async run(message, old) {
        if(!message.guild || old.content === message.content || message.author.bot) return;

        const embed = new MyEmbed()
        .setColor("GOLD")
        .setAuthor(old.author.tag, this.client.user.displayAvatarURL({dynamic: true}))
        .setTitle(`Message Updated`)
        .setDescription([
            `**> Message ID:** ${old.id}`,
            `**> Channel:** ${old.channel}`,
            `**> Author:** ${old.author.tag} (${old.author.id})`
        ])
        .setURL(old.url)
        .splitFields(diffWordsWithSpace(escapeMarkdown(old.content), escapeMarkdown(message.content))
        .map(result => result.added ? `**${result.value}**` : result.removed ? `__${result.value}__` :result.value)
        .join(' '));

        const user = await logchannel.findOne({
            Guild: message.guild.id
        })

        const logs = await user.get("Channel")

    const channel = message.guild.channels.cache.get(logs)
    if(channel)channel.send(embed)
    }
}