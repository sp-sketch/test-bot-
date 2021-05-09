const { MessageEmbed } = require('discord.js')
const logchannel = require('../../models/logchannel')
const Event = require('../../Structures/Event')

module.exports= class extends Event {
    async run(role, newrole) {
        const embed = new MessageEmbed()
        .setTitle("Role Created.")
        .setColor("PINK")
        .addFields(
            {
                name: `Role`,
                value: `**__1.Old Role name__** ${role.name} => __New Role__ : ${newrole.name} \n **__2.Old Color__** ${role.color} => __New Role Color__: ${newrole.color} \n **__3.Old Role Hex__** ${role.colorHex} => __New Role Hex__ : ${newrole.colorHex} `
            }
        )
        const user = await logchannel.findOne({
            Guild: role.guild.id
        })

        const logs = await user.get("Channel")
        this.client.channels.cache.get(logs).send(embed)
    }
}