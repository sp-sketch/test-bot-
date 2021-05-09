const MenuDocsClient = require('./Structures/MenuDocsClient');
const config = require('../config.json');
const enmap = require('enmap')
const path = require('path');

const client = new MenuDocsClient(config);
client.start();

const { GiveawaysManager } = require("discord-giveaways");
const { WebhookClient, MessageEmbed } = require('discord.js');

// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

client.queue = new Map(); //queue for music command!
client.vote = new Map(); //vote for music command!
client.life = new enmap()


client.on('message', message => {
})//oh ks 

const { ReactionRoleManager } = require('discord.js-collector');
const { options } = require('superagent');

const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true, // Enable reaction role store in a Json file
    path: __dirname + '/roles.json', // Where will save the roles if store is enabled
    mongoDbLink: 'mongodb://localhost:27017/locl' // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/blob/master/examples/reaction-role-manager/Note.md
});

client.reactionRoleManager = reactionRoleManager;


client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    if (member.user.bot) return;
    let conditionRole;
  
    let conditionsRoles = require(path.resolve(path.join(__dirname + '/database/conditionRole.json')));
    if (conditionsRoles[giveaway.messageID]) {
      conditionRole = conditionsRoles[giveaway.messageID].conditionRole;
    }
    if (conditionRole != 'none') {
      if (member.roles.cache.find(r => r.id === conditionRole)) {
        member.send(
          new Discord.MessageEmbed()
          .setAuthor(member.user.tag, member.user.displayAvatarURL({
            format: 'png',
            dynamic: 'true'
          }))
          .setColor('GREEN')
          .setDescription(`Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been approved. **Good luck !**`)
          .setFooter(`Giveaway by ${reaction.message.author.tag}`)
          .setTimestamp()
        );
        return;
      } else {
        reaction.users.remove(member.id)
        let role = reaction.message.guild.roles.cache.find(r => r.id === conditionRole);
        member.send(
          new Discord.MessageEmbed()
          .setAuthor(member.user.tag, member.user.displayAvatarURL({
            format: 'png',
            dynamic: 'true'
          }))
          .setColor('RED')
          .setDescription(`Your entry for [this giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${giveaway.messageID}) has been denied. To enter, you need the \`${role.name}\` role.`)
          .setFooter(`Giveaway by ${reaction.message.author.tag}`)
          .setTimestamp()
        );
        return;
      }
    }
  });

