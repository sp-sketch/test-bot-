const logchannel = require('../../models/logchannel');
const Event = require('../../Structures/Event');
const MyEmbed = require('../../Structures/Myembed')

 module.exports = class extends Event {
     async run(message) {
         if(!message.guild || message.author.bot) return;

         const attachments = message.attachments.size ? message.attachments.map(attachement => attachement.proxyURL) : null;
         const embed = new MyEmbed()
         .setColor("GOLD")
         .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic : true}))
         .setTitle(`Message Deleted!`)
         .setDescription([
             `**> Message ID:** ${message.id}`,
             `**>Channel: ** ${message.channel}`,
             `**>Author: ** ${message.member.displayName}`,
             `${attachments ? `**> Attachements:** ${attachments.join('\n')}` : ``}`
         ])
         if(message.content.length) {
             embed.splitFields(`**> Delted Message:** ${message.content}`)
         }
         const user = await logchannel.findOne({
            Guild: message.guild.id
        })

        const logs = await user.get("Channel")

         const channel = message.guild.channels.cache.get(logs)
         if(channel) channel.send(embed)
     }
 }