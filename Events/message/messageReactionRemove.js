const { MessageEmbed } = require('discord.js')
const Event = require('../../Structures/Event')
const ReactionRole = require('../../models/ReactionRole')
module.exports = class extends Event{
    async run(reaction, user) {
        let member = reaction.message.guild.members.cache.get(user.id);
        ReactionRole.findOne(
          {
            Guild: reaction.message.guild.id,
            Reaction: reaction.emoji.toString(),
            MessageID: reaction.message.id,
          },
          async (err, data) => {
            if (err) throw err;
            if (data) {
              if (member.roles.cache.has(data.Role)) {
                member.roles.remove(data.Role);
              } else {
              }
            }
          }
        );
        const handleStarboard = async () => {
          const starboard = this.client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
          const msgs = await starboard.messages.fetch({ limit: 100 });
          const existingMsg = msgs.find(msg => 
              msg.embeds.length === 1 ? 
              (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
          if(existingMsg) {
              if(reaction.count === 0)
                  existingMsg.delete({ timeout: 2500 });
              else
                  existingMsg.edit(`${reaction.count} - ⭐`)
          };
      }
      if(reaction.emoji.name === '⭐') {
          if(reaction.message.channel.name.toLowerCase() === 'starboard') return;
          if(reaction.message.partial) {
              await reaction.fetch();
              await reaction.message.fetch();
              handleStarboard();
          }
          else
              handleStarboard();
      }
    }
    
}