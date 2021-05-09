const Event = require('../Structures/Event');
const DisableCommands = require('../models/disable');
const fisherman = require("../models/fish")
const hunt = require("../models/hunt");
const { MessageEmbed } = require('discord.js');
const logchannel = require('../models/logchannel');
const usedtimes = require('../models/usedtimes');
const marry = require('../models/marry');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		this.client.users.cache.forEach(async(user) => {
			const mcmds = await marry.findOne({
				User: user.id,
			})
			if(!mcmds) {
				console.log(`${user.username} is ready to marry!`)
				await marry.create({
					User: user.id,
					MarriedUser: 0,
					Marriedtimes: 0,
					Divorcedtimes: 0,
					DivorcedUser: 0
				})
			} else {
				return undefined;
			}
		})

		this.client.users.cache.forEach(async(user) => {
			const usedcmds = await usedtimes.findOne({
				user: user.id,
			})
			if(!usedcmds) {
				console.log(`Writing script for ${user.username}!`)
				await usedtimes.create({
					user: user.id,
					times: 0
				})
			} else {
				return undefined;
			}
		})

		this.client.guilds.cache.forEach(async(guild) => {
			const logCommands = await logchannel.findOne({
				Guild: guild.id
			});

			if(!logCommands) {
				console.log(`Made script for the guild ${guild}!`)
				const d = await logchannel.create({
					Guild: guild.id,
				})
			}else {
				return undefined;
			}
		})

		this.client.users.cache.forEach(async(user) => {
			const huntcmds = await hunt.findOne({
				user: user.id,
			})
			if(!huntcmds) {
				console.log("Writing all scripts")
				await hunt.create({
					user: user.id,
					amount: 0,
					rifle: 0
				})
			} else {
				return undefined;
			}
		})

		this.client.users.cache.forEach(async(user) => {
			const fishcommands = await fisherman.findOne({
				user: user.id,
			})
			if(!fishcommands) {
				console.log("Writing all scripts")
				await fisherman.create({
					user: user.id,
					amount: 0,
					pole: 0,
					polestrength: 0
				})
			} else {
				return undefined;
			}
		})

		this.client.guilds.cache.forEach(async(guild) => {
			const disableCommands = await DisableCommands.findOne({
				guildId: guild.id
			});

			if(!disableCommands) {
				const dbc = await DisableCommands.create({
					guildId: guild.id
				})
			}else {
				return undefined;
			}
		})

		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));
		this.client.user.setStatus('dnd')

		const activities = [
			`Watching on ${this.client.guilds.cache.size} Servers!`,
			`Moderating on ${this.client.channels.cache.size} Channels!`,
			`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`
		];

		let i = 0;

		setInterval(() => this.client.user.setActivity(`${this,this.client.prefix}help | ${activities[i++ % activities.length]}`, {type: 'WATCHING'}), 15000)
		
	}


};
