const { MessageEmbed } = require('discord.js')
const logchannel = require('../../models/logchannel')
const Event = require('../../Structures/Event')

module.exports= class extends Event {
    async run(role) {
        const embed = new MessageEmbed()
        .setTitle("Role Created.")
        .setColor("PINK")
        .setDescription(`\n\n >>**__Name of the role:__** ${role.name} \n **__Role color__:** ${role.color} \n **__Role hex:__** ${role.hexColor} \n **__Role ID:__** ${role.id} \n **__Role created at__:** ${role.createdTimestamp} \n\n **__Permissions:__** ${role.permissions}`)
        
        const user = await logchannel.findOne({
            Guild: role.guild.id
        })

        const logs = await user.get("Channel")
        this.client.channels.cache.get(logs).send(embed)
    }
}
