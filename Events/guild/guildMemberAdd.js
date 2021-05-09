const Event = require('../../Structures/Event')
const { MessageEmbed, MessageAttachment, GuildMemberManager, Message } = require('discord.js')
const welcomeChannel = require('../../models/welcome-channel');
const canvass = require("discord-canvas")


module.exports = class extends Event {
    async run(member, message) {

		if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
		if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
		
		let Welcomed = new canvass.Welcome();
		
		let Image = await Welcomed
		.setUsername(member.user.username)
		.setDiscriminator(member.user.discriminator)
		.setGuildName(member.guild.name)
		.setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
		.setMemberCount(member.guild.memberCount)
		.setBackground("https://cdn.discordapp.com/attachments/793391952334422076/794501192469839901/OIP.jpg")
		.toAttachment();
		
		let Attachment = new MessageAttachment(Image.toBuffer(), "Welcome.png");
	
	
		const config = await welcomeChannel.findOne({
			guild: member.guild.id
		})

		const number = await config.get("channelid")

		this.client.channels.cache.get(number).send(Attachment)
    }
}/*

*/ 