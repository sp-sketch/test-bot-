const { MessageEmbed } = require('discord.js')
const Event = require('../../Structures/Event')

module.exports= class extends Event {
    async run(guild) {
        const thanksembed = new MessageEmbed()
        .setColor("PINK")
        .setDescription(`Thanks for adding me to your guild and hope you enjoy with me being \n in the guild and please check out all the intresting commands that I have \n\n **Premium:** Can be added guildwise or userwise just make sure to donate! \n **FAQ:** how does the ticket system work \n > You can refer the guides we have ste in the bot!`)
        .setImage(``)
        .setTimestamp()
        .setFooter("Thank for adding me to your guild!")
        guild.owner.send(thanksembed)
    }
}