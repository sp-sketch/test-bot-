const Event = require('../../Structures/Event');
const { Collection } = require('discord.js');
const {badwords} = require('../../settings/badwords.json')
const custom = require('../../models/custom')
const ms = require('ms');
const Levels = require('discord-xp')
const {mongoPath} = require('../../../config.json');
const { bigheart, beardance, stinkybear } = require('../../settings/emojis.json')
const DisabledCommands = require('../../models/disable');
const User = require('../../models/user');


Levels.setURL(mongoPath)

/* 
const usersMap = new Map();
const LIMIT = 5;
const TIME = 50000;
const DIFF = 5000;*/

module.exports = class extends Event {

	constructor(...args) {
		super(...args);

		this.buckets = new Map();
	}

    async run(message) {
		//muting system for spamming
		/*if(usersMap.has(message.author.id)) {
			const userData = usersMap.get(message.author.id);
			const { lastMessage, timer } = userData;
			const difference = message.createdTimestamp - lastMessage.createdTimestamp;
			let msgCount = userData.msgCount;
			if(difference > DIFF) {
				clearTimeout(timer);
				console.log("Cleared Timeout!")
				userData.msgCount = 1;
				userData.lastMessage = message;
				userData.timer = setTimeout(() => {
					usersMap.delete(message.author.id);
					console.log("Removed from RESET!")
				},TIME);
				usersMap.set(message.author.id, userData)
			}
			else {
				++msgCount;
				if(parseInt(msgCount) === LIMIT) {
					message.member.roles.add(message.guild.roles.cache.find(m => m.name === 'muted'))
					message.reply("You have been Muted! Reason: **Spamming**")
					setTimeout(() => {
						message.member.roles.remove(message.guild.roles.cache.find(m => m.name === 'muted'));
						message.reply("You have been unmuted!")
					}, TIME);
				}else {
						userData.msgCount = msgCount;
						usersMap.set(message.author.id, userData);
				}
			}console.log(msgCount)
		} else {
			let fn = setTimeout(() => {
				usersMap.delete(message.author.id)
				console.log("Removed from map.")
			}, TIME);
			usersMap.set(message.author.id, {
				msgCount: 1,
				lastMessage: message,
				timer: fn
			});
		}
		if (message.member.hasPermission('ADMINISTRATOR')) {
			let confirm = false;

			var i;
			for(i = 0;i < badwords.length; i++) {

				if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
				confirm = true;
			}
			if(confirm) {
				message.delete()
				return message.reply("**You aren't allowed to use bad words here!**")
			}
		}*/
		//ranking system
		if(message.member.user.bot){
			return ;
		} else {
			const randomAmountOfXp = Math.floor(Math.random() * 19) + 1; // Min 1, Max 20
		const hasLeveledUp = await Levels.appendXp(message.author.id, 1, randomAmountOfXp);
		if (hasLeveledUp) {
		  const user = await Levels.fetch(message.author.id, 1);
		  message.channel.send(`${message.author} has leveled up to ${user.level}, thanks for leveling up with our bot ${beardance}.`);
		}
		}
		//mention response
			const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

			if (!message.guild || message.author.bot) return;

			if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);

			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
			
			if(!message.content.startsWith(prefix)) return;

			// eslint-disable-next-line no-unused-vars
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
			let disableCommands = await DisabledCommands.findOne({ guildId: message.guild.id });

			if(disableCommands) {
				let commandDB = await disableCommands.get('commands');//worked
				let check = await commandDB.find(c => c == command.name);
			
				if(check) {
					return message.reply('This command has been disabled');
				}
			}

			if (command) {
				const userData = await User.findOne({ User: message.author.id });
				if (userData && userData.Blacklist === true) {
					return message.channel.send('You are **blacklisted** from using this bot.')
				 }
			
				if(command.disable == true) {
					return message.reply('The command has been disabled');
				}
				if(command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
					return message.reply(`${stinkybear} Sorry, this command can only be used by the bot owners.`)
				}
				if(command.ongoing && !this.client.utils.checkOwner(message.author.id)) {
					return message.reply(`${stinkybear} Sorry, this command is on going a repairement or it is a new command!`)
				}
				if(command.guildOnly && !message.guild) {
					return message.reply(`${stinkybear} Sorry, this command can only be used in our main server.`)
				}
				if(command.nsfw && !message.channel.nsfw) {
					return message.reply(`${stinkybear} Sorry, this command can only be used in a NSFW marked channel.`)

				}
				if(command.args && !args.length) {
					return message.reply(`${stinkybear} Sorry, this command requires arguments to function. Usage: ${command.usage ? 
					command.usage : `This command dosen't have a usage format.`}`)
				}
				if (command.requiredRole && !message.member.roles.cache.some(role => role.name === command.requiredRole)) {
					return message.channel.send(`You need the \`${command.requiredRole}\` role in order to execute this command.`);
				  }
				  const userPermsCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms
				  if(message.guild && userPermsCheck) {
					  const missing = message.channel.permissionsFor(message.member).missing(userPermsCheck)
					  if(missing.length) {
						  return message.reply(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need to use this command.`)
					  }
				  }
				  const botPermsCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms
				  if(message.guild && botPermsCheck) {
					  const missing = message.channel.permissionsFor(message.member).missing(botPermsCheck)
					  if(missing.length) {
						  return message.reply(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need to use this command.`)
					  }
					}
					if (!this.client.owners.includes(message.author.id)) {
						let remaining = await this._runLimits(message, command);
						if (remaining) {
							remaining = ms(remaining - Date.now(), { long: true });
							message.channel.send(`${beardance} Sorry **${message.author}**, you have to wait **${remaining}** before running this command.`);
							return;
						}
					}
				command.run(message, args);
				
		}else {
			custom.findOne(
			  { Guild: message.guild.id, Command: cmd },
			  async (err, data) => {
				if (err) throw err;
				if (data) return message.channel.send(data.Content);
				else return;
			})
		}
	}
	_timeout(userId, commandName) {
		return () => {
			const bucket = this.buckets.get(`${userId}-${commandName}`);
			if (bucket && bucket.timeout) {
				this.client.clearTimeout(bucket.timeout);
			}

			this.buckets.delete(`${userId}-${commandName}`);
		};
	}

	_runLimits(message, command) {
		const tout = this._timeout(message.author.id, command.name);

		let bucket = this.buckets.get(`${message.author.id}-${command.name}`);
		if (!bucket) {
			bucket = {
				reset: command.ratelimit.reset,
				remaining: command.ratelimit.bucket,
				timeout: this.client.setTimeout(tout, command.ratelimit.reset)
			};

			this.buckets.set(`${message.author.id}-${command.name}`, bucket);
		}

		if (bucket.remaining === 0) {
			if (command.ratelimit.stack) {
				if (bucket.limited) {
					if (bucket.timeout) {
						this.client.clearTimeout(bucket.timeout);
					}

					bucket.reset = (bucket.resetsIn - Date.now()) + command.ratelimit.reset;
					bucket.timeout = this.client.setTimeout(tout, bucket.reset);
				}

				bucket.limited = true;
			}

			if (!bucket.resetsIn) {
				bucket.resetsIn = Date.now() + bucket.reset;
			}

			return bucket.resetsIn;
		}

		--bucket.remaining;
		return null;
	}
}